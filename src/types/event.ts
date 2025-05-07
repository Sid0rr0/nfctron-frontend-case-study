export interface EventDetailType {
  eventId: string
  namePub: string
  description: string
  currencyIso: string
  dateFrom: string
  dateTo: string
  headerImageUrl: string
  place: string
}

export interface Seats {
  ticketTypes: TicketType[]
  seatRows: SeatRow[]
}

export interface TicketType {
  id: string // uuid
  name: string
  price: number
}

export interface SeatRow {
  seatRow: number
  seats: Seat[]
}

export interface Seat {
  seatId: string // uuid
  place: number
  ticketTypeId: string // uuid
}

export interface TransformedSeatRow {
  seatRow: number
  seats: TransformedSeat[]
}

export interface TransformedSeat {
  seatId: string // uuid
  place: number
  ticketTypeId: string
  seatRow: number
  type: string
  price: number
}
