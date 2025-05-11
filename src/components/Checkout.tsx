import type { OrderResponse } from '@/types/order'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CheckoutActionType, useCheckout } from '@/hooks/checkoutContext'
import { useAuth } from '@/hooks/userContext'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CheckoutForm from './CheckoutForm'
import LoginForm from './LoginForm'
import OrderSummary from './OrderSummary'
import { Button } from './ui/button'

export default function Checkout() {
  const checkout = useCheckout()
  const auth = useAuth()
  const { t } = useTranslation()
  const [status, setStatus] = useState({
    submited: false,
    message: '',
  })

  const [orderResponse, setOrderResponse] = useState<OrderResponse | null>(null)

  async function handleSubmit(data: {
    email: string
    firstName: string
    lastName: string
  }) {
    setStatus({ submited: true, message: 'Processing...' })
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: checkout.state.eventId,
          tickets: checkout.state.selectedSeats.map(seat => ({
            seatId: seat.seatId,
            ticketTypeId: seat.ticketTypeId,
          })),

          user: { ...data },
        }),
      })
      if (response.ok) {
        const responseData = await response.json()
        setOrderResponse(responseData)
        setStatus({ submited: true, message: t('checkoutSuccess') })
        checkout.dispatch({ type: CheckoutActionType.CLEAR })
      }
      else {
        console.error('Checkout error')
        setStatus({ submited: false, message: t('checkoutError') })
      }
    }
    catch (error) {
      console.error('Checkout error:', error)
      setStatus({ submited: false, message: t('checkoutError') })
    }
  }

  function SeatList() {
    return (
      <div className="w-full">
        <div className="grid grid-cols-5 gap-4 font-medium text-zinc-900 mb-2 p-2 bg-gray-100 rounded">
          <div>Row</div>
          <div>Seat</div>
          <div>Type</div>
          <div>Price</div>
          <div>Action</div>
        </div>
        {checkout.state.selectedSeats.map(seat => (
          <div
            key={seat.seatId}
            className="grid grid-cols-5 gap-4 p-2 border-b text-zinc-800 border-gray-200"
          >
            <div>{seat.seatRow}</div>
            <div>{seat.place}</div>
            <div>{seat.type}</div>
            <div>{seat.price}</div>
            <div>
              <Button
                disabled={status.submited}
                aria-label={t('removeFromCart')}
                onClick={() => checkout.dispatch({ type: CheckoutActionType.REMOVE, seat })}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" disabled={checkout.state.count <= 0}>
          {t('checkoutNow')}
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-zinc-900 flex justify-center mb-4">{t('checkout')}</DialogTitle>
        </DialogHeader>

        {!status.submited && (
          <>
            {/* tickets */}
            <div>
              {checkout.state.count > 0
                ? (
                    <div className="flex flex-col gap-2 items-end">
                      <SeatList />
                      <Button onClick={() => checkout.dispatch({ type: CheckoutActionType.CLEAR })}>{t('removeAll')}</Button>
                    </div>
                  )
                : <span className="text-zinc-500">{t('noTickets')}</span>}

              <div className="flex justify-between items-center text-zinc-900 pt-8">
                <span>
                  {t('totalTickets')}
                  {' '}
                  {checkout.state.count}
                </span>
                <span className="text-2xl font-semibold">
                  {checkout.state.totalPrice}
                  {' '}
                  CZK
                </span>
              </div>
            </div>

            {/* user data */}
            <div className="pt-8 text-zinc-900">
              {!auth.authState.isLoggedIn && (
                <>
                  <h2 className="text-xl flex justify-center">Log In or fill out the info</h2>
                  <h3 className="text-lg">Log in</h3>
                </>
              )}
              {!auth.authState.isLoggedIn && <LoginForm />}

              <>
                <h3 className="text-lg mt-8">{t('fillOutTheInfo')}</h3>
                <CheckoutForm
                  data={{
                    email: auth.authState.user?.email,
                    firstName: auth.authState.user?.firstName,
                    lastName: auth.authState.user?.lastName,
                  }}
                  onSubmit={handleSubmit}
                />
              </>
            </div>
          </>
        )}
        {/* order status */}
        <div className="text-zinc-900">
          {status.message}
          { orderResponse && (
            <>
              <OrderSummary data={orderResponse} />

              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    className="ml-auto mt-4"
                    onClick={() => {
                      setOrderResponse(null)
                      setStatus({ submited: false, message: '' })
                    }}
                  >
                    {t('newOrder')}
                  </Button>
                </DialogClose>
              </DialogFooter>

            </>
          )}
        </div>

      </DialogContent>
    </Dialog>
  )
}
