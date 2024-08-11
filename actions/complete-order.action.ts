"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"


export default async function completeOrder(formData: FormData) {
  // console.log(typeof formData.get('order_id'))
  const data = {
    // orderId: formData.get('order_id') + 'ab'
    orderId: formData.get('order_id')
  }

  const response = OrderIdSchema.safeParse(data)
  if (!response.success) {
    // return response.error
    // console.log('hubo errores')
    console.log(response.error.issues[0].message)
    return
  }

  try {
    await prisma.order.update({
      where: {
        id: response.data.orderId
      },
      data: {
        status: true,
        doneAt: new Date(Date.now())
      }
    })

    revalidatePath('/admin/orders')
  } catch (error) {
    console.log(error)
  }
}