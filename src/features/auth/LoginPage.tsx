import React, { useState } from 'react'
import { useAuthStore } from './authStore'
import { useNavigate } from 'react-router'
import { loginRequest } from './authApi'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const response = await loginRequest(username, password)
      const { accessToken, refreshToken, ...user } = response
      login(user, accessToken)
      navigate('/dashboard')
    } catch {
      setError('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="enter username"
        autoComplete="username"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter password"
        autoComplete="current-password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Waiting' : 'Login'}
      </button>
      {error && <span>{error}</span>}
    </form>
  )
}
