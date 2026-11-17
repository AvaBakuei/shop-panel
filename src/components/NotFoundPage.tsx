import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-6xl font-bold text-brand-600">404</p>
      <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="text-slate-500">The page you are looking for does not exist.</p>
      <Link
        to="/dashboard"
        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        Back to dashboard
      </Link>
    </main>
  )
}
