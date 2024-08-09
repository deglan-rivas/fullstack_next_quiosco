import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient()

async function main() {
  // el categoryId está hardcodead en products.ts por eso si borramos el id autoincremental aumentará y no habrá match, de paso no guardar data en el volume de dockerfile
  // await prisma.category.deleteMany();
  // await prisma.product.deleteMany();

  await prisma.category.createMany({
    data: categories
  })
  await prisma.product.createMany({
    data: products
  })
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })