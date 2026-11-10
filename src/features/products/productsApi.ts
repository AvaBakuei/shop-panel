import { apiFetch } from '../../lib/apiClient'
import type { ProductsQuery, ProductsResponse, Category } from './types'

export const PAGE_SIZE = 10

export function getProducts(query: ProductsQuery) {
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    skip: String((query.page - 1) * PAGE_SIZE),
    sortBy: query.sortBy,
    order: query.order,
  })

  let path = '/auth/products'
  if (query.search) {
    path = '/auth/products/search'
    params.set('q', query.search)
  } else if (query.category) {
    path = `/auth/products/category/${encodeURIComponent(query.category)}`
  }
  return apiFetch<ProductsResponse>(`${path}?${params.toString()}`)
}

export function getCategories() {
  return apiFetch<Category[]>('/auth/products/categories')
}
