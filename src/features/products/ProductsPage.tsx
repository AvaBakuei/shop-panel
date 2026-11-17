import React, { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { getCategories, getProducts, PAGE_SIZE } from './productsApi'
import type { ProductsQuery, SortField, SortOrder } from './types'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import PageHeader from '../../components/ui/PageHeader'
import Select from '../../components/ui/Select'
import { cn } from '../../lib/cn'

const priceFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

const LOW_STOCK_LIMIT = 10

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
    return (
      <div>
        <PageHeader title="Products" />
        <Card className="p-6 text-sm text-slate-500">Loading products...</Card>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <PageHeader title="Products" />
        <Card role="alert" className="border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Products could not be loaded. Please try again later.
        </Card>
      </div>
    )
  }

  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE))

  return (
    <div>
      <PageHeader title="Products" description={`${data.total} products in your shop`} />

      <Card className="mb-4 flex flex-col gap-4 p-4 md:flex-row md:items-end">
        <form onSubmit={handleSearch} className="flex flex-1 items-end gap-2">
          <div className="flex flex-1 flex-col gap-1">
            <label htmlFor="search" className="text-sm font-medium text-slate-700">
              Search
            </label>
            <Input
              id="search"
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search products..."
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        <div className="flex flex-col gap-1 md:w-52">
          <label htmlFor="category" className="text-sm font-medium text-slate-700">
            Category
          </label>
          <Select id="category" value={query.category} onChange={handleCategoryChange}>
            <option value="">All categories</option>
            {categories?.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-1 md:w-52">
          <label htmlFor="sort" className="text-sm font-medium text-slate-700">
            Sort by
          </label>
          <Select id="sort" value={`${query.sortBy}-${query.order}`} onChange={handleSortChange}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        {data.products.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table
              className={cn(
                'w-full min-w-[640px] text-left text-sm transition-opacity',
                isPlaceholderData && 'opacity-50',
              )}
            >
              <thead className="bg-slate-50 text-xs font-medium tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-10 w-10 rounded-lg bg-slate-100 object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{product.title}</td>
                    <td className="px-4 py-3 text-slate-600 capitalize">{product.category}</td>
                    <td className="px-4 py-3 text-right text-slate-900 tabular-nums">
                      {priceFormatter.format(product.price)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      <span
                        className={cn(
                          product.stock < LOW_STOCK_LIMIT
                            ? 'rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-800'
                            : 'text-slate-600',
                        )}
                      >
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <nav
          aria-label="Pagination"
          className="flex items-center justify-between border-t border-slate-100 px-4 py-3"
        >
          <Button
            variant="secondary"
            onClick={() => updateParams({ page: String(query.page - 1) })}
            disabled={query.page <= 1}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-600">
            Page {query.page} of {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() => updateParams({ page: String(query.page + 1) })}
            disabled={query.page >= totalPages}
          >
            Next
          </Button>
        </nav>
      </Card>
    </div>
  )
}
