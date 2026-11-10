import { useAuthStore } from '../features/auth/authStore'

const BASE_URL = 'https://dummyjson.com'

export async function apiFetch<T>(path: string): Promise<T> {
  const token = useAuthStore.getState().token
  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  const response = await fetch(`${BASE_URL}${path}`, { headers })

  if (response.status === 401) {
    useAuthStore.getState().logout()
    throw new Error('Session expired')
  }
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}
