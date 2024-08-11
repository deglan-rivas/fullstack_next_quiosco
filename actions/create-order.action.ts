"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schemas"

type Response = {
  errors?: string[],
  success?: string
}

export default async function createOrder(data: unknown): Promise<Response> {
  // console.log("createOrder desde el server")
  // return "createOrder"

  const result = OrderSchema.safeParse(data)
  if (!result.success) {
    // console.log(result.error.issues)
    // result.error.issues.forEach(issue => console.log(issue.message, 'desde el server'))
    return {
      errors: result.error.issues.map(issue => issue.message)
    }
  }

  // console.log(result.data, 'desde el server')
  try {
    await prisma.order.create({
      data: {
        to: result.data.to,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map((item) => ({
            quantity: item.quantity,
            productId: item.id
          }))
        }
      }
    })
    return {
      success: "Order created successfully"
    }
  } catch (error) {
    console.log(error)
    return {
      errors: ["Something went wrong in db"]
    }
  }
}