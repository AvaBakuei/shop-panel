import { apiFetch } from '../../lib/apiClient'
import type { ProductsResponse } from './types'

export function getProducts() {
  return apiFetch<ProductsResponse>('/auth/products')
}
