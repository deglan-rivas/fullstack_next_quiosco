"use client"

import OrderCard from "@/components/admin/orders/OrderCard";
import Heading from "@/components/ui/Heading";
// import { prisma } from "@/src/lib/prisma";
import { OrderWithProducts } from "@/src/types";
// import { revalidatePath } from "next/cache";
import useSWR from 'swr';

// const getPendingOrders = async () => {
//   const orders = await prisma.order.findMany({
//     where: {
//       status: false
//     },
//     include: {
//       orderProducts: {
//         include: {
//           product: true
//         }
//       }
//     }
//   })

//   return orders
// }

export default function Orders() {
  // const pendingOrders = await getPendingOrders()
  // console.log(JSON.stringify(pendingOrders, null, 2))

  // const refreshOrders = async () => {
  //   "use server"
  //   revalidatePath("/admin/orders")
  // }

  const url = '/admin/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  // const fetcher = () => fetch(url).then(res => res.json())
  const { data: pendingOrders, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  })

  if (isLoading) return (
    <p>
      Cargando...
    </p>
  )

  if (pendingOrders) return (
    <>
      <Heading>
        Administrar Ordenes
      </Heading>

      {/* <form
        action={refreshOrders}
      >
        <input
          type="submit"
          value="Refrescar Órdenes"
          className="bg-amber-400 w-full text-xl px-10 py-3 text-center font-bold cursor-pointer lg:w-auto"
        />
      </form> */}

      {pendingOrders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {pendingOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">
          No hay ordenes Pendientes
        </p>
      )}
    </>
  )
}
