interface Props {
  params: {
    category: string
  }
}

async function getProducts(category: string) {

}

export default function OrderCategory({ params }: Props) {
  // console.log(params)
  return (
    <div>
      {params.category}
    </div>
  )
}
