import type { User } from './auth'

interface Ticket {
  ticketTypeId: string
  seatId: string
}

export interface OrderResponse {
  message: string
  orderId: string
  tickets: Ticket[]
  user: User
  totalAmount: number
}
