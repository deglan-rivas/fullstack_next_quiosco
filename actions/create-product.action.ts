"use server"

import { prisma } from "@/src/lib/prisma"
import { NewProductSchema } from "@/src/schemas"

type Response = {
  errors?: string[],
  success?: string
}

export async function createProduct(data: unknown): Promise<Response> {
  const result = NewProductSchema.safeParse(data)

  if (!result.success) return { errors: result.error.issues.map(issue => issue.message) }

  try {
    await prisma.product.create({ data: result.data })
    return { success: 'Product added successfully' }
  } catch (error) {
    console.log(error)
    return { errors: ['Failed to add product'] }
  }
}