"use client"

import { SearchFormSchema } from "@/src/schemas"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function ProductSearchForm() {
  const router = useRouter()

  const handleSearchForm = async (formData: FormData) => {
    const data = {
      search: formData.get('search')
    }

    const result = SearchFormSchema.safeParse(data)

    if (!result.success) {
      result.error.issues.forEach(issue => toast.error(issue.message))
      return
    }

    router.push(`/admin/products/search?search=${result.data.search}`)
  }

  return (
    <form
      action={handleSearchForm}
      className="flex items-center"
    >
      <input
        type="text"
        placeholder="Buscar Producto"
        className="p-2 placeholder-gray-400 w-full"
        name="search"
      />

      <input
        type="submit"
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
        value={'Buscar'}
      />

    </form>
  )
}
