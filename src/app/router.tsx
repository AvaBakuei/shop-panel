import { createBrowserRouter, Navigate } from 'react-router'
import LoginPage from '../features/auth/LoginPage'
import NotFoundPage from '../components/NotFoundPage'
import AppLayout from '../components/layout/AppLayout'
import DashboardPage from '../features/dashboard/DashboardPage'
import ProductsPage from '../features/products/ProductsPage'
import UsersPage from '../features/users/UsersPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
