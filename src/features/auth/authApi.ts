import type { LoginResponse } from './types'
const BASE_URL = 'https://dummyjson.com'

export async function loginRequest(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!response.ok) {
    throw new Error('Request Failed!')
  }
  const data = await response.json()
  return data
}
