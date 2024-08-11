import OrderCard from "@/components/admin/orders/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

const getPendingOrders = async () => {
  const orders = await prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })

  return orders
}

export default async function Orders() {
  const pendingOrders = await getPendingOrders()
  // console.log(JSON.stringify(pendingOrders, null, 2))

  return (
    <>
      <Heading>
        Administrar Ordenes
      </Heading>

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
