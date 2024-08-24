"use server"

import { prisma } from "@/src/lib/prisma"
import { NewProductSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type Response = {
  errors?: string[],
  success?: string
}

export async function updateProduct(data: unknown, id: number): Promise<Response> {
  const result = NewProductSchema.safeParse(data)

  if (!result.success) return { errors: result.error.issues.map(issue => issue.message) }

  try {
    await prisma.product.update({
      where: { id },
      data: result.data
    })
    revalidatePath('/admin/products')
    return { success: 'Product added successfully' }
  } catch (error) {
    console.log(error)
    return { errors: ['Failed to add product'] }
  }
}