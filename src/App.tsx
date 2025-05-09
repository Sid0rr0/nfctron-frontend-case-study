import type { EventDetailType, SeatRow, TicketType, TransformedSeatRow } from './types/event'
import EventDetail from '@/components/EventDetail'

import Header from '@/components/Header'

import { Button } from '@/components/ui/button.tsx'
import { useCheckout } from '@/hooks/checkoutContext'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const isLoggedIn = false
  const apiUrl = import.meta.env.VITE_API_URL
  const checkout = useCheckout()

  const eventDetail = useQuery({ queryKey: ['todos'], queryFn: async () => {
    return fetch(`${apiUrl}/event`)
      .then(res => res.json()) as Promise<EventDetailType>
  } })

  const [seats, setSeats] = useState<TransformedSeatRow[]>([])
  const [longestRow, setLongestRow] = useState(0)

  useEffect(() => {
    if (eventDetail.data?.eventId) {
      const controller = new AbortController()

      fetch(`${apiUrl}/event-tickets?eventId=${eventDetail.data.eventId}`)
        .then(res => res.json())
        .then((data) => {
          const transformedSeatRows: TransformedSeatRow[] = []
          let longestRow = 0
          data.seatRows.forEach((seatRow: SeatRow) => {
            const transformedSeatRow = {
              seatRow: seatRow.seatRow,
              seats: seatRow.seats.map((seat) => {
                const ticketType = data.ticketTypes.find((ticketType: TicketType) => ticketType.id === seat.ticketTypeId)
                if (seat.place > longestRow) {
                  longestRow = seat.place
                }
                return {
                  ...seat,
                  seatRow: seatRow.seatRow,
                  type: ticketType.name,
                  price: ticketType.price,
                }
              }).sort((a, b) => a.place - b.place),
            }

            transformedSeatRows.push(transformedSeatRow)
          })

          setLongestRow(longestRow)
          setSeats(transformedSeatRows)
        })
        .catch(err => console.error(err))

      return () => {
        controller.abort()
      }
    }
  }, [eventDetail.data?.eventId])

  return (

    <div className="flex flex-col grow">
      <Header
        isLoggedIn={isLoggedIn}
      />

      <main className="grow flex flex-col justify-center">
        {
          eventDetail.isLoading
            ? (
                <div className="flex justify-center items-center grow">
                  <span className="text-zinc-500">Loading...</span>
                </div>
              )
            : (
                eventDetail.data ? <EventDetail eventDetail={eventDetail.data} transformedSeatRow={seats} seatsInRow={longestRow} /> : 'Error'
              )
        }

      </main>

      {/* bottom cart affix (wrapper) */}
      <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 text-zinc-900 flex justify-center">
        {/* inner content */}
        <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
          {/* total in cart state */}
          {/* checkout */}
          <div className="flex flex-col">
            <span>
              Total for
              {' '}
              {checkout.state.count}
              {' '}
              tickets
            </span>
            <span className="text-2xl font-semibold">
              {checkout.state.totalPrice}
              {' '}
              CZK
            </span>
          </div>

          {/* checkout button */}
          <Button disabled variant="default">
            Checkout now
          </Button>
        </div>
      </nav>
    </div>

  )
}

export default App
