/**
 * Joins class names while ignoring falsy values.
 * Keeps component class lists readable without introducing a dependency.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
