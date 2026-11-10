export interface Product {
  id: number
  title: string
  price: number
  category: string
  stock: number
  thumbnail: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface Category {
  slug: string
  name: string
}

export type SortField = 'title' | 'price' | 'stock'
export type SortOrder = 'asc' | 'desc'

export interface ProductsQuery {
  page: number
  search: string
  category: string
  sortBy: SortField
  order: SortOrder
}
