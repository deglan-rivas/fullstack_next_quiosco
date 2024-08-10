"use client"

import { useStore } from "@/src/store"
import { formatCurrency } from "@/src/utils"
import { useMemo } from "react"
import OrderItem from "../ui/OrderItem"

export default function OrderSummary() {
  const order = useStore(state => state.order)
  const total = useMemo(() => order.reduce((total, item) => total + item.subtotal, 0), [order])

  return (
    <aside className="py-5 space-y-5 text-center md:w-72 md:h-screen lg:w-96 lg:h-screen lg:overflow-y-scroll">
      <h1 className="text-4xl font-black">
        Mi Pedido
      </h1>

      {
        order.length === 0
          ? (
            <p className="text-xl text-center my-5">
              No hay elementos en el pedido
            </p>
          )
          : (
            <div className="space-y-5">
              {order.map(item => <OrderItem key={item.id} item={item} />)}

            </div>
          )
      }

      <p className="text-xl font-black">
        Total: {''}
        <span>
          {formatCurrency(total)}
        </span>
      </p>
    </aside >
  )
}
