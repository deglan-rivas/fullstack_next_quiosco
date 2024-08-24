"use client"

import { useRouter } from "next/navigation"

export default function GoBackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className='bg-amber-400 w-full text-xl px-10 py-3 text-center font-bold cursor-pointer lg:w-auto'
    // className='bg-amber-400 flex flex-auto text-xl px-10 py-3 text-center font-bold cursor-pointer md:flex-initial md:justify-center'
    // className='bg-amber-400 w-full text-xl px-10 py-3 text-center font-bold cursor-pointer lg:w-auto'
    >
      Volver
    </button>
  )
}
