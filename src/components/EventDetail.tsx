import type { EventDetailType, TransformedSeatRow } from '@/types/event.ts'
import { Seat } from '@/components/Seat.tsx'
import { Button } from '@/components/ui/button.tsx'

interface EventDetailProps {
  eventDetail: EventDetailType
  transformedSeatRow: TransformedSeatRow[]
  seatsInRow: number
}

export default function EventDetail({ eventDetail, transformedSeatRow, seatsInRow }: EventDetailProps) {
  return (

    <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
      {/* seating card */}
      <div
        className="bg-white rounded-md grow p-3 self-stretch shadow-sm flex flex-col gap-2"
      >
        {/* seating map */}
        {
          transformedSeatRow.map(seatRow => (
            <div className="flex flex-row gap-2 items-center" key={seatRow.seatRow}>
              <span className="text-black">
                Row:
                {' '}
                {seatRow.seatRow}
              </span>

              {Array.from({ length: seatsInRow }, (_, i) => {
                // Find the seat at this position (if it exists)
                const seatAtPosition = seatRow.seats.find(seat => seat.place === i + 1)

                return seatAtPosition
                  ? (
                      <Seat key={seatAtPosition.seatId} seat={seatAtPosition} />
                    )
                  : (
                      <span key={`seat${i}`} className="size-8 flex justify-center items-center rounded-full bg-zinc-300 cursor-not-allowed">
                        {i + 1}
                      </span>
                    )
              })}
            </div>
          ))
        }
      </div>

      {/* event info */}
      <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
        <img
          src={eventDetail.headerImageUrl}
          alt="Event header"
          className="rounded-md h-32 object-cover"
        />
        {/* event name */}
        <h1 className="text-xl text-zinc-900 font-semibold">{eventDetail.namePub}</h1>
        {/* event description */}
        <p className="text-sm text-zinc-500">{eventDetail.description}</p>
        {/* add to calendar button */}
        <Button variant="secondary" disabled>
          Add to calendar
        </Button>
      </aside>
    </div>

  )
}
