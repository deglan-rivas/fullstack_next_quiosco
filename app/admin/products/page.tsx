import ProductTable from "@/components/products/new/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts({ take, skip }: { take: number, skip: number }) {
  return await prisma.product.findMany({
    take,
    skip,
    include: {
      category: true
    }
  })
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

type ProducPagePros = {
  searchParams: {
    page: string
  }
}

export default async function ProductsPage({ searchParams }: ProducPagePros) {
  const PAGE_SIZE = 10
  // console.log(searchParams.page, typeof searchParams.page)
  const page = +searchParams.page || 1

  const skip = (page - 1) * PAGE_SIZE
  const take = PAGE_SIZE

  const products = await getProducts({ take, skip })
  // console.log(products)

  return (
    <>
      <Heading>
        Administrar Productos
      </Heading>

      <ProductTable
        products={products}
      />


    </>
  )
}
