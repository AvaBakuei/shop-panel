import { useQuery } from '@tanstack/react-query'
import { getProducts } from './productsApi'

const priceFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

export default function ProductsPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })
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

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Products</h1>

      <table className="w-full border-collapse bg-white text-left text-sm">
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
    </div>
  )
}
