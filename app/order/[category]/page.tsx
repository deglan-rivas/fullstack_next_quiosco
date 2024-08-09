import ProductCard from "@/components/products/ProductCard"
import { prisma } from "@/src/lib/prisma"

interface Props {
  params: {
    category: string
  }
}

async function getProducts(category: string) {
  return await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
}

export default async function OrderCategory({ params }: Props) {
  // console.log(params)
  const products = await getProducts(params.category)
  // console.log(products)

  return (
    <>
      <h2 className="my-10 text-2xl text-center">
        Elige y personaliza tu pedido
      </h2>

      <div className="grid gap-4 items-start grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
