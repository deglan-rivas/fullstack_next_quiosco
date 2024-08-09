import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

type Options = {
  category: Category
}

export default function CategoryIcon({ category }: Options) {
  return (
    <div className="w-full flex items-center justify-start gap-4 p-5 border-b-2 border-gray-200">
      <div className="w-16 h-16 relative">
        <Image
          src={`categories/icon_${category.slug}.svg`}
          alt={`imagen de ${category.name}`}
          fill
        />
      </div>
      <Link
        className="text-xl font-bold"
        href={`/order/${category.slug}`}
      >
        {category.name}
      </Link>
    </div>
  )
}