import type { TransformedSeat } from '@/types/event.ts'
import { Button } from '@/components/ui/button.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import { CheckoutActionType, useCheckout } from '@/hooks/checkoutContext'
import { cn } from '@/lib/utils.ts'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
  seat: TransformedSeat
  disabled?: boolean
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>((props, ref) => {
  const checkout = useCheckout()
  const { t } = useTranslation()
  const isInCart = useMemo(() => {
    return checkout.state.selectedSeats.some(seat => seat.seatId === props.seat.seatId)
  }, [checkout.state.selectedSeats, props.seat.seatId])

  return (
    <Popover>
      <PopoverTrigger
        disabled={props.disabled}
        className={cn('size-8 flex justify-center items-center rounded-full bg-green-500 hover:bg-green-700 data-[state=open]:bg-yellow-400 transition-color', props.className, isInCart && 'bg-orange-400')}
      >
        <div
          ref={ref}
        >
          <span className="text-white">{props.seat.place}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">
              {t('seatRow')}
              :
            </span>
            <span className="font-semibold">{props.seat.seatRow}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">
              {t('seatNumber')}
              :
            </span>
            <span className="font-semibold">{props.seat.place}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">
              {t('ticketType')}
              :
            </span>
            <span className="font-semibold">{props.seat.type}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">
              {t('price')}
              :
            </span>
            <span className="font-semibold">
              {props.seat.price}
              {' '}
              {t('currency')}
            </span>
          </div>
        </div>

        {/* checkout */}
        <footer className="flex flex-col">
          {
            isInCart
              ? (
                  <Button onClick={() => checkout.dispatch({ type: CheckoutActionType.REMOVE, seat: props.seat })} variant="destructive" size="sm">
                    {t('removeFromCart')}
                  </Button>
                )
              : (
                  <Button onClick={() => checkout.dispatch({ type: CheckoutActionType.ADD, seat: props.seat })} variant="default" size="sm">
                    {t('addToCart')}
                  </Button>
                )
          }
        </footer>
      </PopoverContent>
    </Popover>
  )
})
