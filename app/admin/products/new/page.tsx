import AddProductForm from "@/components/products/new/AddProductForm";
import ProductForm from "@/components/products/new/ProductForm";
import Heading from "@/components/ui/Heading";

export default function NewProductPage() {
  return (
    <>
      <Heading>
        Nuevo Producto
      </Heading>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  )
}
