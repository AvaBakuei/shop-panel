import React, { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { getCategories, getProducts, PAGE_SIZE } from './productsApi'
import type { ProductsQuery, SortField, SortOrder } from './types'

const priceFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

const sortOptions = [
  { value: 'title-asc', label: 'Name A–Z' },
  { value: 'title-desc', label: 'Name Z–A' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'stock-asc', label: 'Stock: low to high' },
  { value: 'stock-desc', label: 'Stock: high to low' },
]

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query: ProductsQuery = {
    page: Number(searchParams.get('page') ?? '1'),
    search: searchParams.get('q') ?? '',
    category: searchParams.get('category') ?? '',
    sortBy: (searchParams.get('sortBy') ?? 'title') as SortField,
    order: (searchParams.get('order') ?? 'asc') as SortOrder,
  }

  const [searchText, setSearchText] = useState(query.search)

  const { data, isPending, isError, isPlaceholderData } = useQuery({
    queryKey: ['products', query],
    queryFn: () => getProducts(query),
    placeholderData: keepPreviousData,
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity,
  })

  function updateParams(changes: Record<string, string>) {
    setSearchParams((prev) => {
      for (const [key, value] of Object.entries(changes)) {
        if (value) {
          prev.set(key, value)
        } else {
          prev.delete(key)
        }
      }
      return prev
    })
  }

  function handleSearch(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    updateParams({ q: searchText.trim(), category: '', page: '' })
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateParams({ category: e.target.value, q: '', page: '' })
    setSearchText('')
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const [sortBy, order] = e.target.value.split('-')
    updateParams({ sortBy, order, page: '' })
  }

  if (isPending) {
    return <p>Loading products...</p>
  }

  if (isError) {
    return (
      <p role="alert" className="text-red-600">
        Products could not be loaded. Please try again later.
      </p>
    )
  }

  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE))

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Products</h1>

      <div className="mb-4 flex flex-wrap items-end gap-4">
        <form onSubmit={handleSearch} className="flex items-end gap-2">
          <div className="flex flex-col">
            <label htmlFor="search" className="text-sm font-medium">
              Search
            </label>
            <input
              id="search"
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="rounded border px-2 py-1"
            />
          </div>
          <button type="submit" className="rounded border px-3 py-1">
            Search
          </button>
        </form>

        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            value={query.category}
            onChange={handleCategoryChange}
            className="rounded border px-2 py-1"
          >
            <option value="">All categories</option>
            {categories?.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="sort" className="text-sm font-medium">
            Sort by
          </label>
          <select
            id="sort"
            value={`${query.sortBy}-${query.order}`}
            onChange={handleSortChange}
            className="rounded border px-2 py-1"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {data.products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table
          className={`w-full border-collapse bg-white text-left text-sm ${isPlaceholderData ? 'opacity-50' : ''}`}
        >
          <thead className="border-b bg-slate-100">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 text-right">Price</th>
              <th className="px-4 py-2 text-right">Stock</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-2">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-10 w-10 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2 capitalize">{product.category}</td>
                <td className="px-4 py-2 text-right">{priceFormatter.format(product.price)}</td>
                <td className="px-4 py-2 text-right">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <nav aria-label="Pagination" className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => updateParams({ page: String(query.page - 1) })}
          disabled={query.page <= 1}
          className="rounded border px-3 py-1 disabled:opacity-40"
        >
          Previous
        </button>
        <span>
          Page {query.page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => updateParams({ page: String(query.page + 1) })}
          disabled={query.page >= totalPages}
          className="rounded border px-3 py-1 disabled:opacity-40"
        >
          Next
        </button>
      </nav>
    </div>
  )
}
