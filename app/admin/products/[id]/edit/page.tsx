import EditProductForm from "@/components/products/[id]/edit/EditProductForm"
import ProductForm from "@/components/products/new/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
  // si olvidas el await, entonces no será undefined pues devolverá una promise pending por resolver, por eso extraer el product.name da error xd
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })

  // console.log(product)
  if (!product) notFound()

  return product
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(+params.id)

  return (
    <>
      {/* <Heading>
        Editar Producto: {product.name}
      </Heading> */}

      {/* <GoBackButton /> */}

      <div className="max-w-3xl mx-auto flex flex-col justify-between items-center lg:flex-row">
        <Heading>
          Editar Producto: {product.name}
        </Heading>

        <GoBackButton />
      </div>

      <EditProductForm>
        <ProductForm
          product={product}
        />
      </EditProductForm>
    </>
  )
}
