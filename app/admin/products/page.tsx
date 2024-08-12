import ProductsPagination from "@/components/products/ProductPagination";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

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
  if (page < 0 || isNaN(page)) redirect('/admin/products')

  const skip = (page - 1) * PAGE_SIZE
  const take = PAGE_SIZE

  const productsData = getProducts({ take, skip })
  const totalProductsData = prisma.product.count()

  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE)

  return (
    <>
      <Heading>
        Administrar Productos
      </Heading>

      <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
        <Link
          href={'/admin/products/new'}
          className='bg-amber-400 w-full lg:w-auto text-lg px-10 py-3 text-center font-bold cursor-pointer'
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable
        products={products}
      />

      < ProductsPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}
