import type { EventDetailType, SeatRow, TicketType, TransformedSeatRow } from '@/types/event.ts'
import { Seat } from '@/components/Seat.tsx'
import { useQuery } from '@tanstack/react-query'
import { AddToCalendarButton } from 'add-to-calendar-button-react'
import { t } from 'i18next'
import { useMemo, useState } from 'react'
import { Skeleton } from './ui/skeleton'

interface EventDetailProps {
  eventDetail: EventDetailType
}

export default function EventDetail({ eventDetail }: EventDetailProps) {
  const eventSeats = useQuery({
    queryKey: ['eventSeats'],
    queryFn: async () => {
      return fetch(`${import.meta.env.VITE_API_URL}/event-tickets?eventId=${eventDetail.eventId}`)
        .then(res => res.json())
    },
    enabled: !!eventDetail.eventId,
  })

  const [longestRow, setLongestRow] = useState(0)
  // gathers all necessary data to be displayed in the Seat component, sorts the seats & finds the row length
  const transformedSeatRow = useMemo(() => {
    if (eventSeats.status === 'success') {
      const transformedSeatRows: TransformedSeatRow[] = []
      let longestRow = 0
      eventSeats.data.seatRows.forEach((seatRow: SeatRow) => {
        const transformedSeatRow = {
          seatRow: seatRow.seatRow,
          seats: seatRow.seats.map((seat) => {
            const ticketType = eventSeats.data.ticketTypes.find((ticketType: TicketType) => ticketType.id === seat.ticketTypeId)
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

      return transformedSeatRows
    }
    else {
      return []
    }
  }, [eventSeats.status])

  return (

    <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full flex-col md:flex-row">
      {/* seating card */}
      <div
        className="bg-white rounded-md grow p-3 self-stretch shadow-sm flex flex-col gap-2 items-start xl:items-center overflow-auto"
      >
        {/* seating map */}
        {eventSeats.isLoading
          ? <Skeleton className="h-1/4 w-8/12 rounded-xl" />
          : (
              <>
                {transformedSeatRow.map(seatRow => (
                  <div className="flex flex-row gap-2 items-center" key={seatRow.seatRow}>
                    <span className="text-black pr-2 text-center w-6">
                      {seatRow.seatRow}
                    </span>

                    {Array.from({ length: longestRow }, (_, i) => {
                      // Find the seat at this position (if it exists)
                      const seatAtPosition = seatRow.seats.find(seat => seat.place === i + 1)

                      return seatAtPosition
                        ? (
                            <Seat key={seatAtPosition.seatId} seat={seatAtPosition} />
                          )
                        : (
                            // unavailable seat
                            <span key={`seat${i}`} className="size-8 flex justify-center items-center rounded-full bg-zinc-300 cursor-not-allowed">
                              {i + 1}
                            </span>
                          )
                    })}
                  </div>
                ))}
              </>
            )}
      </div>
      {/* event info */}
      <aside className="w-full md:max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
        <img
          src={eventDetail.headerImageUrl}
          alt="Event header"
          className="rounded-md object-cover"
        />
        {/* event name */}
        <h1 className="text-xl text-zinc-900 font-semibold">{eventDetail.namePub}</h1>
        {/* event description */}
        <p className="text-sm text-zinc-500">{eventDetail.description}</p>
        {/* add to calendar button */}
        <div className="mx-auto">
          <AddToCalendarButton
            label={t('addToCalendar')}
            name={eventDetail.namePub}
            options="'Apple','Google'"
            startDate={eventDetail.dateFrom}
            endDate={eventDetail.dateTo}
            timeZone="Europe/Prague"
          />
        </div>

      </aside>
    </div>

  )
}
