import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'

export default function Select({ className, children, ...rest }: ComponentProps<'select'>) {
  return (
    <select
      className={cn(
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm',
        'focus-visible:border-brand-500 focus-visible:outline-2 focus-visible:outline-brand-100',
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  )
}
