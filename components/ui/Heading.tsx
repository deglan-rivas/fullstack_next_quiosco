export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="my-10 text-2xl text-center">
      {children}
    </h2>
  )
}
