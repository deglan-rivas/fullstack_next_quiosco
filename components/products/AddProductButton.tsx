"use client"

import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

interface Props {
  product: Product
}

export default function AddProductButton({ product }: Props) {
  const addToOrder = useStore((state) => state.addToOrder)

  return (
    <button className="text-white bg-indigo-600 text-center uppercase py-2 rounded-md w-full font-bold cursor-pointer hover:bg-indigo-800"
      onClick={() => addToOrder(product)}
    >
      Agregar
    </button>
  )
}
