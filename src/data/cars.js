/**
 * Central vehicle inventory.
 *
 * All vehicles, prices, specifications and availability are sample data for
 * this frontend demonstration. Images are stored locally in public/images.
 */
export const cars = [
  {
    id: 'bmw-5-series',
    brand: 'BMW',
    model: '5 Series',
    name: 'BMW 5 Series',
    category: 'Luxury',
    type: 'Sedan',
    pricePerDay: 120,
    image: '/images/cars/bmw-5-series.jpg',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    year: 2024,
    mileage: 18450,
    description:
      'A composed executive sedan that balances confident performance with everyday comfort. The 5 Series is equally at home on a coastal weekend or a cross-city commute, with a quiet cabin and intuitive driver technology.',
    features: [
      'Adaptive LED headlights',
      'Heated front seats',
      'Panoramic glass roof',
      'Apple CarPlay & Android Auto',
      '360° parking camera',
      'Adaptive cruise control',
    ],
    availability: true,
  },
  {
    id: 'mercedes-c-class',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    name: 'Mercedes-Benz C-Class',
    category: 'Luxury',
    type: 'Sedan',
    pricePerDay: 110,
    image: '/images/cars/mercedes-c-class.jpg',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    year: 2023,
    mileage: 22180,
    description:
      'Understated elegance with a genuinely engaging drive. The C-Class pairs a refined interior with smooth, responsive power — a natural choice for business trips and special occasions alike.',
    features: [
      'MBUX infotainment system',
      'Burmester® sound system',
      'Ambient interior lighting',
      'Wireless phone charging',
      'Blind spot assist',
      'Power-adjustable front seats',
    ],
    availability: true,
  },
  {
    id: 'toyota-camry',
    brand: 'Toyota',
    model: 'Camry',
    name: 'Toyota Camry',
    category: 'Everyday',
    type: 'Sedan',
    pricePerDay: 65,
    image: '/images/cars/toyota-camry.jpg',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    seats: 5,
    year: 2024,
    mileage: 15600,
    description:
      'Effortless, efficient and easy to live with. The Camry Hybrid offers a spacious cabin and remarkably low fuel consumption, making it an ideal companion for long drives and busy city days.',
    features: [
      'Hybrid efficiency',
      'Toyota Safety Sense',
      'Wireless Apple CarPlay',
      'Dual-zone climate control',
      'Power driver seat',
      'Rear passenger vents',
    ],
    availability: true,
  },
  {
    id: 'range-rover-sport',
    brand: 'Land Rover',
    model: 'Range Rover Sport',
    name: 'Range Rover Sport',
    category: 'Luxury',
    type: 'SUV',
    pricePerDay: 180,
    image: '/images/cars/range-rover-sport.jpg',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    year: 2023,
    mileage: 26340,
    description:
      'Commanding presence with first-class comfort. The Range Rover Sport blends refined on-road manners with all-weather capability, whether you are heading for the mountains or the city.',
    features: [
      'All-wheel drive',
      'Air suspension',
      'Panoramic sunroof',
      'Heated front & rear seats',
      'Meridian™ sound system',
      'Terrain response modes',
    ],
    availability: true,
  },
  {
    id: 'porsche-911',
    brand: 'Porsche',
    model: '911 Carrera',
    name: 'Porsche 911 Carrera',
    category: 'Performance',
    type: 'Sports',
    pricePerDay: 250,
    image: '/images/cars/porsche-911.jpg',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 4,
    year: 2023,
    mileage: 9800,
    description:
      'The benchmark sports car, distilled. Razor-sharp steering, a characterful flat-six soundtrack and everyday usability make every trip in the 911 feel like an occasion.',
    features: [
      'Rear-wheel drive',
      'Sport Chrono package',
      'Bose® surround sound',
      'Adaptive sport seats',
      'Porsche Communication Management',
      'Sport exhaust system',
    ],
    availability: true,
  },
  {
    id: 'tesla-model-3',
    brand: 'Tesla',
    model: 'Model 3',
    name: 'Tesla Model 3',
    category: 'Electric',
    type: 'Sedan',
    pricePerDay: 95,
    image: '/images/cars/tesla-model-3.jpg',
    fuelType: 'Electric',
    transmission: 'Automatic',
    seats: 5,
    year: 2024,
    mileage: 12300,
    description:
      'Instant torque, a whisper-quiet cabin and a minimalist interior define the Model 3 experience. A relaxed, modern way to cover distance with zero tailpipe emissions.',
    features: [
      'Autopilot driver assistance',
      'Glass panoramic roof',
      'Heated seats & steering wheel',
      'Premium audio system',
      'Over-the-air software updates',
      'Supercharger network access',
    ],
    availability: true,
  },
  {
    id: 'audi-q7',
    brand: 'Audi',
    model: 'Q7',
    name: 'Audi Q7',
    category: 'Luxury',
    type: 'SUV',
    pricePerDay: 150,
    image: '/images/cars/audi-q7.jpg',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seats: 7,
    year: 2022,
    mileage: 31850,
    description:
      'A refined seven-seat SUV that handles family duty and long-distance travel with equal composure. Quattro all-wheel drive and a beautifully finished cabin keep every journey comfortable.',
    features: [
      'Quattro all-wheel drive',
      'Virtual Cockpit display',
      'Three-zone climate control',
      'Power tailgate',
      'Bang & Olufsen sound system',
      'Third-row seating',
    ],
    availability: false,
  },
  {
    id: 'honda-civic',
    brand: 'Honda',
    model: 'Civic',
    name: 'Honda Civic',
    category: 'Everyday',
    type: 'Sedan',
    pricePerDay: 55,
    image: '/images/cars/honda-civic.jpg',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    year: 2022,
    mileage: 28900,
    description:
      'Compact, efficient and surprisingly fun. The Civic is a dependable city companion with a practical cabin, confident handling and strong fuel economy.',
    features: [
      'Honda Sensing safety suite',
      'Apple CarPlay & Android Auto',
      'Rearview camera',
      'Automatic climate control',
      'Keyless entry',
      'Fold-flat rear seats',
    ],
    availability: true,
  },
  {
    id: 'ford-mustang',
    brand: 'Ford',
    model: 'Mustang GT',
    name: 'Ford Mustang GT',
    category: 'Performance',
    type: 'Sports',
    pricePerDay: 140,
    image: '/images/cars/ford-mustang.jpg',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 4,
    year: 2023,
    mileage: 14700,
    description:
      'A modern interpretation of an American icon. With a V8 soundtrack, confident rear-wheel-drive dynamics and a surprisingly comfortable cabin, the Mustang is built for the open road.',
    features: [
      'V8 engine',
      'Selectable drive modes',
      'Performance brakes',
      'Heated leather seats',
      'Apple CarPlay & Android Auto',
      'Rear parking sensors',
    ],
    availability: true,
  },
  {
    id: 'hyundai-tucson',
    brand: 'Hyundai',
    model: 'Tucson',
    name: 'Hyundai Tucson',
    category: 'Everyday',
    type: 'SUV',
    pricePerDay: 75,
    image: '/images/cars/hyundai-tucson.jpg',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    seats: 5,
    year: 2024,
    mileage: 11900,
    description:
      'Bold design, generous space and thoughtful technology. The Tucson Hybrid is a versatile everyday SUV that makes short errands and long weekend escapes equally easy.',
    features: [
      'Hybrid powertrain',
      'Wireless charging',
      'Blind-spot monitoring',
      'Heated front seats',
      'Power tailgate',
      'Smart cruise control',
    ],
    availability: true,
  },
  {
    id: 'mercedes-g-class',
    brand: 'Mercedes-Benz',
    model: 'G-Class',
    name: 'Mercedes-Benz G-Class',
    category: 'Luxury',
    type: 'SUV',
    pricePerDay: 220,
    image: '/images/cars/mercedes-g-class.jpg',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    year: 2023,
    mileage: 20500,
    description:
      'An unmistakable silhouette and a character all its own. The G-Class combines genuine off-road ability with a luxurious cabin — a statement vehicle for memorable occasions.',
    features: [
      'Four-wheel drive',
      'Differential locks',
      'Burmester® sound system',
      'Heated & ventilated seats',
      'Sunroof',
      '360° camera',
    ],
    availability: false,
  },
  {
    id: 'toyota-corolla',
    brand: 'Toyota',
    model: 'Corolla',
    name: 'Toyota Corolla',
    category: 'Economy',
    type: 'Sedan',
    pricePerDay: 45,
    image: '/images/cars/toyota-corolla.jpg',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    year: 2022,
    mileage: 34600,
    description:
      'The dependable choice for straightforward, economical travel. Compact enough for the city and comfortable enough for longer journeys, the Corolla keeps things simple.',
    features: [
      'Excellent fuel economy',
      'Toyota Safety Sense',
      'Bluetooth connectivity',
      'Rearview camera',
      'Air conditioning',
      'USB charging ports',
    ],
    availability: true,
  },
]

export const featuredCarIds = [
  'bmw-5-series',
  'range-rover-sport',
  'porsche-911',
  'tesla-model-3',
  'mercedes-c-class',
  'ford-mustang',
]

const categoryOrder = ['Luxury', 'Everyday', 'Performance', 'Electric', 'Economy']
const typeOrder = ['Sedan', 'SUV', 'Sports']

export const carCategories = [...new Set(cars.map((car) => car.category))].sort(
  (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b),
)

export const carTypes = [...new Set(cars.map((car) => car.type))].sort(
  (a, b) => typeOrder.indexOf(a) - typeOrder.indexOf(b),
)

export const fleetPriceRange = {
  min: Math.min(...cars.map((car) => car.pricePerDay)),
  max: Math.max(...cars.map((car) => car.pricePerDay)),
}

export function getCarById(id) {
  return cars.find((car) => car.id === id)
}

export function getFeaturedCars() {
  return featuredCarIds.map((id) => getCarById(id)).filter(Boolean)
}

/**
 * Picks a few alternatives for the details page, preferring the same body type.
 */
export function getRelatedCars(car, limit = 3) {
  if (!car) return []

  return cars
    .filter((candidate) => candidate.id !== car.id)
    .sort((a, b) => {
      const typeMatchDifference = Number(b.type === car.type) - Number(a.type === car.type)
      if (typeMatchDifference !== 0) return typeMatchDifference

      const categoryMatchDifference =
        Number(b.category === car.category) - Number(a.category === car.category)
      if (categoryMatchDifference !== 0) return categoryMatchDifference

      return a.pricePerDay - b.pricePerDay
    })
    .slice(0, limit)
}
