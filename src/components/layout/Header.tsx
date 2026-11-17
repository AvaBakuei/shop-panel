import { useAuthStore } from '../../features/auth/authStore'
import Button from '../ui/Button'

export default function Header() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Guest'
  const initial = user?.firstName.charAt(0) ?? '?'

  return (
    <header className="flex items-center justify-end gap-4 border-b border-slate-200 bg-white px-4 py-3 md:px-8">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700"
        >
          {initial}
        </span>
        <span className="hidden text-sm font-medium text-slate-700 sm:inline">{fullName}</span>
      </div>
      <Button variant="secondary" onClick={logout}>
        Logout
      </Button>
    </header>
  )
}
