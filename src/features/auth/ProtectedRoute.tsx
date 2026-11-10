import { Outlet, useLocation, Navigate } from 'react-router'
import { useAuthStore } from './authStore'

export default function ProtectedRoute() {
  const token = useAuthStore((s) => s.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return <Outlet />
}
