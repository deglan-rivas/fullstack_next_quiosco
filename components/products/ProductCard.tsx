import { formatCurrency } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border bg-white p-5 space-y-5">
      {/* <div className="w-64 h-80 relative"> */}
      <Image
        src={`/products/${product.image}.jpg`}
        alt={product.name}
        // fill
        width={400}
        height={500}
      // quality={50}
      />
      {/* </div> */}
      <h3 className="text-xl font-bold">
        {product.name}
      </h3>
      <p className="text-2xl font-black text-amber-500">
        {/* {product.price.toFixed(2)} */}
        {formatCurrency(product.price)}
        {/* {product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })} */}
        {/* {product.price.toLocaleString("es-MX", { style: "currency", currency: "MXN" })} */}
      </p>

      <AddProductButton
        product={product}
      />
    </div>
  )
}
