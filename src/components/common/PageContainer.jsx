import { cn } from '../../utils/cn'

export default function PageContainer({ children, className, as: Tag = 'div' }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10', className)}>
      {children}
    </Tag>
  )
}
