import { NavLink } from 'react-router'
import { cn } from '../../lib/cn'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/products', label: 'Products' },
  { to: '/users', label: 'Users' },
]

export default function Sidebar() {
  return (
    <aside className="flex shrink-0 items-center gap-4 bg-slate-900 px-4 py-3 text-white md:w-64 md:flex-col md:items-stretch md:gap-8 md:py-6">
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold"
        >
          S
        </span>
        <span className="hidden text-lg font-semibold sm:inline">ShopPanel</span>
      </div>

      <nav aria-label="Main" className="flex gap-1 overflow-x-auto md:flex-col">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                'focus-visible:outline-2 focus-visible:outline-brand-500',
                isActive ? 'bg-brand-600 text-white' : 'text-slate-300 hover:bg-slate-800',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
