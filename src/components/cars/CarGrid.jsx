import CarCard from './CarCard'
import { cn } from '../../utils/cn'

export default function CarGrid({ cars, className }) {
  return (
    <div className={cn('grid gap-5 sm:grid-cols-2', className)}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  )
}
