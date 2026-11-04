import { useAuthStore } from '../auth/authStore'

const fakeUser = {
  id: 1,
  username: 'emilys',
  email: 'emily@example.com',
  firstName: 'Emily',
  lastName: 'Johnson',
  image: '',
}
export default function DashboardPage() {
  const login = useAuthStore((s) => s.login)
  return (
    <div>
      <h1 className="text-2xl font-semibold">DashboardPage</h1>
      <button type="button" onClick={() => login(fakeUser, 'fake-token')}>
        Fake Login
      </button>
    </div>
  )
}
