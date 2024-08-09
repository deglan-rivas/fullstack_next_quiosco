import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";

async function getCategories() {
  return await prisma.category.findMany()
}

export default async function OrderSidebar() {
  const categories = await getCategories()
  // console.log(categories)

  return (
    <aside className="md:w-72 md:h-screen bg-white text-center">
      {/* <aside className="md:w-72 md:h-screen bg-white text-center divide-y-2"> */}
      {categories.map((category) => (
        <CategoryIcon key={category.id} category={category} />
      ))}
    </aside>
  )
}
