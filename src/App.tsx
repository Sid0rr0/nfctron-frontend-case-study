import type { EventDetailType } from './types/event'
import EventDetail from '@/components/EventDetail'
import Header from '@/components/Header'
import { CheckoutActionType, useCheckout } from '@/hooks/checkoutContext'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Checkout from './components/Checkout'
import { Skeleton } from './components/ui/skeleton'
import './App.css'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL
  const checkout = useCheckout()
  const { t } = useTranslation()

  const eventDetail = useQuery({ queryKey: ['eventDetail'], queryFn: async () => {
    return fetch(`${apiUrl}/event`)
      .then(res => res.json()) as Promise<EventDetailType>
  } })

  useEffect(() => {
    if (eventDetail.data?.eventId) {
      checkout.dispatch({
        type: CheckoutActionType.SET_EVENT_ID,
        eventId: eventDetail.data.eventId,
      })
    }
  }, [eventDetail.data?.eventId])

  return (

    <div className="flex flex-col grow">
      <Header />

      <main className="grow flex flex-col items-center justify-center">
        {
          eventDetail.isSuccess
            ? (
                eventDetail.data
                  ? <EventDetail eventDetail={eventDetail.data} />
                  : <div className="text-center">Error</div>
              )
            : (
                <div className="flex flex-col items-start justify-center gap-2">
                  <Skeleton className="h-1/2 min-h-32 w-1/2 min-w-64 rounded-xl" />
                  <Skeleton className="h-4 w-1/2 min-w-64" />
                  <Skeleton className="h-4 w-16" />
                </div>
              )
        }

      </main>

      {/* bottom cart affix (wrapper) */}
      <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 text-zinc-900 flex justify-center z-20">
        {/* inner content */}
        <div className="max-w-screen-lg p-6 flex flex-col md:flex-row justify-between items-center gap-4 grow">
          {/* total in cart state */}
          {/* checkout */}
          <div className="flex items-center justify-between gap-8 md:gap-1 md:flex-col">
            <span>
              {t('totalTickets')}
              {' '}
              {checkout.state.count}
            </span>
            <span className="text-2xl font-semibold">
              {checkout.state.totalPrice}
              {' '}
              {t('currency')}
            </span>
          </div>

          {/* checkout button */}
          <Checkout />
        </div>
      </nav>
    </div>

  )
}

export default App
