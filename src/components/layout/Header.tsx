import { useAuthStore } from '../../features/auth/authStore'

export default function Header() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <span>{user?.firstName ?? 'Guest'}</span>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </header>
  )
}
