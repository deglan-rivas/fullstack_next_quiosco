"use server"

import Sidebar from "@/components/Sidebar"

function ProductPage() {
  console.log('desde ProductPage')

  return (
    <div>
      ProductPage
      <Sidebar />
    </div>
  )
}

export default ProductPage