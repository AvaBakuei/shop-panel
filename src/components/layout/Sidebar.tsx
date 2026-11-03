import { NavLink } from 'react-router'
const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
  },
  {
    to: '/products',
    label: 'Products',
  },
  {
    to: '/users',
    label: 'Users',
  },
]
export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 p-4 text-white">
      <div className="mb-6 text-lg font-bold">Shop Panel</div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 ${isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
