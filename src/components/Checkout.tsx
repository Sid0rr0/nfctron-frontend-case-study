import {
  Dialog,
  DialogContent,
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
import { Button } from './ui/button'

export default function Checkout() {
  const checkout = useCheckout()
  const auth = useAuth()
  const { t } = useTranslation()
  const [status, setStatus] = useState({
    submited: false,
    message: '',
  })

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
      const responseData = await response.json()
      if (response.ok) {
        setStatus({ submited: true, message: 'Checkout successful!' })
      }
      else {
        console.error('Checkout error:', responseData)
        setStatus({ submited: false, message: 'Checkout failed. Please try again.' })
      }
    }
    catch (error) {
      console.error('Checkout error:', error)
      setStatus({ submited: false, message: 'Checkout failed. Please try again.' })
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
          {checkout.state.count > 0 ? <SeatList /> : <span className="text-zinc-500">{t('noTickets')}</span>}

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

          <div className="pt-8 text-zinc-900">
            {!auth.authState.isLoggedIn && (
              <>
                <h2 className="text-xl flex justify-center">Log In or fill out the info</h2>
                <h3 className="text-lg">Log in</h3>
              </>
            )}
            {!auth.authState.isLoggedIn && <LoginForm />}

            {!status.submited
              && (
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
              )}

            <div>
              {status.message}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
