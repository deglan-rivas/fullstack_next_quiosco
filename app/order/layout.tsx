import OrderSidebar from '@/components/order/OrderSidebar';
import OrderSummary from '@/components/order/OrderSummary';

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='md:flex md:justify-between'>
        <OrderSidebar />

        <main className='py-5 md:flex-1 md:h-screen md:overflow-y-scroll'>
          {children}
        </main>

        <OrderSummary />
      </div>
    </>
  )
}