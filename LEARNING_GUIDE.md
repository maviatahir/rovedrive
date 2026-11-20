# RoveDrive Learning Guide

This guide explains how the RoveDrive demo is put together, why the key decisions were made, and how to extend it. It is written for someone learning React who wants to understand a complete multi-page frontend beyond individual tutorials.

> RoveDrive is a fictional demonstration. All business data is sample content; no backend or real payments are involved.

---

## 1. What the project demonstrates

A compact but complete frontend application with:

- Multi-page routing using React Router.
- A shared layout with active navigation, mobile menu and hash-section scrolling.
- Centralised data with derived facets and related-item logic.
- Combined search, filtering and sorting through a custom hook.
- Controlled forms with custom validation and focus management.
- Date-only arithmetic without timezone bugs.
- Context API for shared booking state.
- Safe LocalStorage persistence with schema validation and cross-tab updates.
- Accessible dialogs, toasts, skip navigation and keyboard focus states.
- Responsive design from 375 px to 1440 px.
- A production build with SPA route fallbacks.

The code intentionally avoids a backend, fake authentication and payment integration. The interesting engineering is in the frontend state and data flow.

---

## 2. Architecture at a glance

```text
main.jsx
  └─ BrowserRouter
       └─ BookingProvider          (shared saved bookings + persistence)
            └─ App
                 └─ Routes
                      └─ Layout    (navbar, footer, scroll manager)
                           └─ Page (one per route)
                                ├─ page-specific components
                                ├─ shared hooks
                                ├─ context
                                └─ pure utilities
```

The layers have clear responsibilities:

| Layer | Responsibility |
| --- | --- |
| `data/` | Static sample inventory and site details |
| `utils/` | Pure(ish) logic: dates, pricing, validation, formatting, storage |
| `hooks/` | Reusable stateful behaviour: filter engine, scroll lock, document title |
| `context/` | App-wide booking collection and persistence |
| `components/` | Presentational and interactive UI building blocks |
| `pages/` | Route composition and page-level state |
| `App.jsx` | Route table |
| `main.jsx` | Providers and app mount |

### Why this split?

- **Data is centralised** so prices and availability are never duplicated across cards and pages.
- **Calculations live in utilities** so the form, summary and success page all use the same rules.
- **Filtering lives in a hook** so the fleet page stays focused on layout and accessibility.
- **Booking persistence lives in context** so the navbar count, success page and My Bookings stay in sync.
- **Components remain mostly presentational**, which makes them easier to reason about and reuse.

---

## 3. Route map and page responsibilities

| Route | Component | Responsibility |
| --- | --- | --- |
| `/` | `HomePage` | Marketing content, hero search, featured cars |
| `/fleet` | `FleetPage` | Search, filters, sorting, results and empty state |
| `/cars/:id` | `CarDetailsPage` | Details, specs, availability, related cars |
| `/booking/:id` | `BookingPage` | Route guards, form state, validation, persistence trigger |
| `/booking-success` | `BookingSuccessPage` | Validate reference, show confirmation or fallback |
| `/my-bookings` | `MyBookingsPage` | Saved history, empty state, clear-history dialog |
| `*` | `NotFoundPage` | Friendly 404 and recovery links |

### Layout route

`Layout` is a parent route that renders the navbar and footer around an `<Outlet />`. This avoids repeating the shell on every page and keeps the 404 page inside the same visual system.

`ScrollManager` lives inside the layout. On each route change it:

- scrolls to the top when there is no hash; or
- finds the element referenced by the hash (`#about`, `#contact`, etc.) and scrolls to it after the new page renders.

Links such as `/#about` use a normal Router `Link`. This works even when the user is currently on `/fleet`: the pathname changes to `/`, the homepage mounts, and the scroll manager finds the section on the next tick.

### Unknown car IDs

React Router's wildcard catches unknown routes, but a valid route with a bad parameter (`/cars/not-a-car`) still matches `CarDetailsPage`. That page handles the lookup failure explicitly and shows an empty state rather than crashing. The booking page does the same and also blocks unavailable vehicles.

---

## 4. The fleet filter engine

### State shape

```js
{
  query: '',
  category: 'all',
  type: 'all',
  maxPrice: 250,
  availableOnly: false,
  sort: 'recommended'
}
```

`useCarFilters(cars, initialFilters)`:

1. Calculates the minimum and maximum price once from the inventory.
2. Normalises initial values (valid category/type, numeric price, valid sort).
3. Stores filters with `useState`.
4. Derives results with `useMemo`.
5. Exposes setters, the facet lists, price bounds and active-filter metadata.

### Matching logic

```text
search tokens → category → body type → max price → availability
```

Search is token-based. `"bmw sedan"` becomes `["bmw", "sedan"]`; every token must appear somewhere in the combined `brand model name category type fuel` string. This makes word order less important than a single substring check, and lets users search terms such as `electric`, `SUV` or `hybrid`.

The results are only sorted after filtering. Sorting copies the array (`[...results]`) so the source inventory order never changes. That keeps the “Recommended” order stable.

### Why keep filters local?

The homepage needs to pass a query and category to the fleet page. That is handled with URL parameters:

```text
/fleet?q=porsche&category=Performance
```

`FleetPage` reads these once as initial state. After that, filter interaction is local component state. This avoids a complex two-way URL sync layer while still supporting shareable entry links. If you extend the app, syncing the full filter state to the URL is a good exercise.

### Price normalisation detail

`Number('')` is `0`, which would incorrectly clamp the maximum price to the cheapest car. The hook explicitly treats empty, `null` and `undefined` values as “no maximum” before converting to a number.

### UI composition

- `SearchBar` owns the visual search field and clear button.
- `SortSelect` owns the native select with a custom chevron.
- `CarFilters` owns category/type chips, price slider and availability switch.
- `FleetPage` composes them, controls the mobile filter panel, and renders results or the empty state.
- `CarGrid` maps results into `CarCard`s.

`CarCard` is one large Router link. There are no nested links inside it, which keeps the DOM valid and the click target generous. Category and availability badges use text, not colour alone.

---

## 5. The booking flow

### Page-level guard

`BookingPage` is both a form and a route guard:

1. Look up the ID with `getCarById`.
2. If missing → “car not found” state.
3. If present but `availability === false` → “not available” state.
4. Otherwise render the form and summary.

The form is never shown for a vehicle that cannot be booked.

### Form state

`BookingPage` owns the values:

```js
{
  fullName: '',
  email: '',
  phone: '',
  pickupDate: '',
  returnDate: ''
}
```

The form is controlled. Every keystroke updates the values, which means the summary can calculate the live total immediately. Errors are stored separately and cleared for the edited field.

### Date behaviour

- `pickupMin` is today.
- `returnMin` is the day after pickup (or tomorrow if pickup is empty).
- When pickup changes, an existing return date that is no longer at least one day later is cleared.
- The summary shows “Select a date” until valid dates exist.
- Rental days are whole calendar days and the total is `rate × days`.

See section 7 for the timezone reasoning.

### Validation

`validateBooking(values, car)` returns an object of field → message:

```js
{
  fullName: 'Please enter your full name.',
  email: 'Enter a valid email address, such as name@example.com.',
  // ...
}
```

The form uses `noValidate` so browser bubbles do not interrupt the custom UX. Submit does four things:

1. Runs validation and stops if any field is invalid.
2. Focuses the first invalid input (or the general error panel for form-level errors).
3. Checks for a duplicate record in the current history.
4. Sets a submission lock before attempting persistence.

### Duplicate prevention

There are two layers:

- **Double-submit guard**: a `useRef` lock is set synchronously at the start of submission, and the submit button becomes disabled/loading.
- **Duplicate-record check**: an existing booking with the same car, pickup date, return date and normalised email blocks a second record.

Both are local checks because there is no server. A real backend would also need an idempotency key and a database constraint.

### Unique references

`generateBookingReference` builds an `RD-` prefix plus six characters from an unambiguous alphabet. It checks the current history and retries on collision. After 25 attempts it adds a short timestamp suffix. This is more than a demo needs, but it demonstrates thinking beyond `Math.random()`.

### Persistence order

The context writes to LocalStorage **before** updating React state:

```text
validate → build record → write storage → update state → navigate
```

If storage is blocked or full, the write throws, the page displays an error, and the user never sees a success screen. That ordering is deliberate: a confirmation screen should mean the record actually exists.

### Success page lookup

`BookingSuccessPage` reads `?ref=` from the URL and asks the context for a booking with that reference. It does not trust the URL alone.

- Valid reference → confirmation details.
- Missing reference → “open My Bookings” fallback.
- Unknown/stale reference → “couldn't locate that booking” fallback.

Because the provider loads from LocalStorage on mount, a page refresh still finds the booking.

---

## 6. Context and LocalStorage

### Why context?

The navbar shows a saved-booking count; My Bookings lists the bookings; the success page looks one up; the booking page needs existing references for collision and duplicate checks. Passing this through props would be noisy. Context gives all of them one source of truth.

### Provider responsibilities

`BookingProvider`:

- Initialises state from `readBookingsFromStorage` (lazy initialiser).
- Keeps a ref of the latest list for safe updates during events.
- Exposes `addBooking`, `clearBookings` and `findBookingByReference`.
- Listens for the `storage` event to sync other tabs.

### Safe storage helpers

`storage.js` protects against:

- blocked LocalStorage access;
- malformed JSON;
- non-array payloads;
- records with missing or invalid fields;
- quota errors.

`isValidBooking` checks the reference shape, car snapshot, customer shape, date-only strings, positive totals and a valid creation timestamp. Invalid records are filtered out; corrupt payloads are removed. The app never crashes because of manually edited storage.

### Privacy choices

- My Bookings shows the full name but masks the email (`a•••@example.com`).
- The phone number is never rendered in history.
- The confirmation page also masks the email after saving.
- The footer and page copy repeatedly state that this is a demo and that data stays in the browser.

For a real product, you would need a privacy policy, retention rules, consent and secure server-side storage. None of that is claimed here.

---

## 7. Date handling: why not `new Date(dateString)`?

`<input type="date">` gives `YYYY-MM-DD`. JavaScript parses that as UTC midnight. In timezones behind UTC, formatting the resulting date can display the previous day.

The project avoids this with three helpers:

- `parseDateOnly('2026-12-01')` builds `new Date(2026, 11, 1)` in local time and rejects impossible dates like `2026-02-31`.
- `toDateOnlyString(date)` formats local year/month/day components.
- `differenceInCalendarDays(a, b)` converts both local calendar dates to UTC timestamps and divides by whole days, so daylight-saving changes cannot create 23/25-hour day errors.

This keeps the form, summary, saved booking and displayed history consistent.

---

## 8. Accessibility notes

### Forms

- Every field has a real `<label htmlFor>`.
- Required fields use the `required` attribute (with `noValidate`, so the custom messages still run).
- Errors are connected through `aria-describedby`; invalid fields get `aria-invalid`.
- Phone hints are connected too.
- Submit focuses the first invalid field or the form error panel.
- The form-level error uses `role="alert"` and `tabIndex="-1"`.

### Dialogs and toasts

`ConfirmationModal`:

- renders in a portal;
- uses `role="dialog"`, `aria-modal="true"`, labelled title and described body;
- closes on Escape and backdrop mouse-down;
- traps Tab/Shift+Tab;
- restores focus to the trigger when closed;
- locks body scroll.

`Toast`:

- appears in a portal;
- uses `role="status"` for success and `role="alert"` for errors;
- auto-dismisses, with an accessible dismiss button.

### Navigation and content

- Skip link at the top of the layout.
- `main` has an ID and `tabIndex={-1}`.
- Active nav links use `aria-current="page"`.
- Mobile menu uses `aria-expanded` and `aria-controls`, closes on Escape, and restores focus to its button.
- Decorative icons and overlays are `aria-hidden`; informative images have alt text.
- Availability uses a coloured dot **and** a text label.
- `prefers-reduced-motion` disables smooth scrolling and animations.

---

## 9. Design system

The Tailwind v4 theme lives in `src/index.css`:

| Token family | Purpose |
| --- | --- |
| `ink-950` → `ink-500` | Layered dark surfaces and borders |
| `mist-100` → `mist-600` | Primary, secondary and muted text |
| `accent` | Orange actions and highlights |
| `font-sans` | Inter for body copy |
| `font-display` | Manrope for headings |
| `shadow-card`, `shadow-float` | Depth without heavy shadows |
| `bg-grid-pattern` | Subtle technical backdrop |

Design principles used throughout:

- One accent colour, used for action and focus rather than decoration everywhere.
- Large display headings with tight tracking and balanced wrapping.
- Cards with thin translucent borders instead of heavy fills.
- Consistent 12–20 px radii and generous but not wasteful spacing.
- Status states (available, saved, error) always include an icon or label.

---

## 10. Responsive behaviour

Breakpoints follow Tailwind defaults:

- **375 px**: single-column layouts, stacked hero search, mobile filter panel, stacked footer.
- **768 px**: two-column vehicle grids, two-column form fields.
- **1024 px**: desktop navigation, sticky details/booking sidebar, fleet sidebar.
- **1440 px**: wider content inside a 1320 px max container and three-column fleet results.

Potential overflow is controlled with `min-w-0` on flex/grid children, `flex-wrap` on metadata rows, `break-words` via natural text wrapping, and `max-width` on long prose.

The mobile filter panel uses a single toggle with `aria-expanded` and `aria-controls`. On desktop it is always visible; on mobile it is visually hidden until opened. The same DOM is reused, so state is not duplicated.

---

## 11. Testing walkthrough

Use this sequence to verify the app manually.

### Setup

```bash
npm install
npm run dev
```

### 1. Navigation and layout

- Visit every navbar and footer link.
- Confirm `/about` sections scroll into view and the active nav state is sensible.
- Resize to below 1024 px and open the mobile menu; press Escape.
- Visit `/anything-else` and confirm the 404 page.

### 2. Fleet

- Search `bmw`, `electric` and a nonsense term.
- Select each category and body type.
- Move the price slider to the minimum.
- Turn on “Available only”; confirm the Audi Q7 and Mercedes G-Class disappear.
- Combine filters and sorting; confirm the count and grid update.
- Clear all filters; confirm the full 12-car list returns.
- Use the homepage search with a keyword and category; confirm the fleet opens pre-filtered.

### 3. Details

- Open every car from the grid.
- Confirm specs, features, rental information and related cars render.
- Open an unavailable car and confirm booking is disabled.
- Visit `/cars/not-real` and confirm the empty state.

### 4. Booking

- Submit an empty form; check all messages and focus.
- Use `bad-email`, `123`, a past pickup date and a return on the same day as pickup.
- Choose valid dates and confirm the total updates.
- Change pickup to a later date; confirm an invalid return date is cleared.
- Complete a valid booking; confirm the reference and success page.
- Refresh the success page; confirm it still finds the booking.
- Go back and submit the same details again; confirm the duplicate message.

### 5. My Bookings

- Confirm the saved card displays reference, dates, duration and total.
- Confirm the email is masked and no phone number appears.
- Use “Book again” where available.
- Open “Clear history”, cancel, then open and confirm.
- Confirm the empty state and success toast.
- Refresh and confirm the empty state persists.

### 6. Responsive and accessibility

- Check 375, 768, 1024 and 1440 px; scroll horizontally to detect overflow.
- Tab through the homepage, form and footer.
- Open the clear-history dialog and test Escape, Tab trapping and focus restore.
- Enable “reduce motion” at the OS level and confirm animations are effectively disabled.

### 7. Production

```bash
npm run build
npm run preview
```

- Open a deep route such as `/cars/bmw-5-series` directly.
- Refresh it; the preview server should serve the SPA shell.
- Check the console for errors and confirm the local images load.

---

## 12. Exercises to extend

1. **Date-aware availability**: mark specific date ranges unavailable per car and prevent overlapping bookings.
2. **URL-synced filters**: reflect query, category, type, price and sort in the URL and restore them on back/forward navigation.
3. **Edit/cancel a single booking**: add per-record actions with the same confirmation pattern.
4. **Automated tests**: unit-test `dates.js`, `booking.js` and `useCarFilters`, then add React Testing Library tests for validation and the clear-history dialog.
5. **Real backend**: replace LocalStorage with an API, add server-side validation, authentication, payment and email.
6. **Accessibility audit**: run axe or Lighthouse and address any findings.
7. **Image optimisation**: generate responsive `srcset` variants and modern formats for the car photos.
8. **Internationalisation**: externalise copy and support currency/date locales.
9. **Dark/light theme**: add a second token palette and a persisted preference.
10. **Analytics/events**: track filter usage and booking funnel steps without collecting unnecessary personal data.

---

## 13. Key takeaways

- Centralised data plus derived state is simpler than duplicating values across UI components.
- Date-only strings are not interchangeable with `Date` objects; handle them deliberately.
- Persist first, confirm second. A success page should not appear if the write failed.
- Context is a good fit for a small cross-page collection, but not a substitute for server state.
- Accessibility is mostly a series of small, consistent decisions: labels, focus, semantics and text alternatives.
- A convincing demo does not need fake authentication or payments; it needs clear limitations and honest copy.
