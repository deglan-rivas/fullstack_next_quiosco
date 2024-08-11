"use client"

import createOrder from "@/actions/create-order.action"
import { OrderSchema } from "@/src/schemas"
import { useStore } from "@/src/store"
import { formatCurrency } from "@/src/utils"
import { useMemo } from "react"
import { toast } from "react-toastify"
import OrderItem from "../ui/OrderItem"

export default function OrderSummary() {
  const order = useStore(state => state.order)
  const clearOrder = useStore(state => state.clearOrder)
  const total = useMemo(() => order.reduce((total, item) => total + item.subtotal, 0), [order])

  const handleCreateOrder = async (formData: FormData) => {

    // method entries, get, getAll, has. keys, values
    // console.log(formData.get('to'))
    // const data = Object.fromEntries(formData)
    // console.log(data)

    const data = {
      // to: formData.get('to')?.toString() || '',
      to: formData.get('to'),
      total: total,
      order: order
    }

    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      // console.log(result.error.issues)
      // result.error.issues.forEach(issue => console.log(issue.message))
      result.error.issues.forEach(issue => toast.error(issue.message))
      return
    }
    // console.log(result.data)

    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach(error => toast.error(error))
    }

    toast.success('Orden creada exitosamente')
    clearOrder()
  }

  return (
    <aside className="py-5 px-2 space-y-5 text-center md:w-72 md:h-screen lg:w-96 lg:h-screen lg:overflow-y-scroll">
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

      <form
        className="space-y-5 pt-5"
        action={handleCreateOrder}
      >
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          className="w-full rounded-md px-5 py-2 bg-white border-gray-200 border"
          name="to"
        />

        <button
          type="submit"
          className="text-white bg-gray-900 px-5 py-2 rounded-md uppercase font-bold  hover:bg-black"
        >
          Agregar Pedido
        </button>
      </form>
    </aside >
  )
}
