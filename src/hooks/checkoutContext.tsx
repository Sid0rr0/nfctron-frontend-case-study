import type { TransformedSeat } from '@/types/event'
import { createContext, useContext, useReducer } from 'react'

interface CheckoutState {
  eventId: string
  count: number
  totalPrice: number
  selectedSeats: Array<TransformedSeat>
}

interface CheckoutAction { type: CheckoutActionType, seat: TransformedSeat, eventId?: string }
enum CheckoutActionType {
  ADD = 'add',
  REMOVE = 'remove',
  SET_EVENT_ID = 'set_event_id',
}

interface CheckoutContextType {
  state: CheckoutState
  dispatch: React.Dispatch<CheckoutAction>
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

function checkoutReducer(state: CheckoutState, action: CheckoutAction) {
  switch (action.type) {
    case CheckoutActionType.ADD: {
      return {
        eventId: state.eventId,
        count: state.count + 1,
        totalPrice: state.totalPrice + action.seat.price,
        selectedSeats: [...state.selectedSeats, action.seat],
      }
    }
    case CheckoutActionType.REMOVE: {
      return {
        eventId: state.eventId,
        count: state.count - 1,
        totalPrice: state.totalPrice - action.seat.price,
        selectedSeats: state.selectedSeats.filter(seat => seat.seatId !== action.seat.seatId),
      }
    }
    case CheckoutActionType.SET_EVENT_ID: {
      return {
        ...state,
        eventId: action.eventId ? action.eventId : state.eventId,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, { eventId: '', count: 0, totalPrice: 0, selectedSeats: [] })

  const value = { state, dispatch }
  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
}

function useCheckout() {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}

export { CheckoutActionType, CheckoutProvider, useCheckout }
