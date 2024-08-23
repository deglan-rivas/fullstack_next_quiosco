export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

export const getImagePath = (imagePath: string) => {
  const IMAGE_DOMAIN = 'https://res.cloudinary.com'

  if (imagePath.startsWith(IMAGE_DOMAIN)) return imagePath

  return `/products/${imagePath}.jpg`
}