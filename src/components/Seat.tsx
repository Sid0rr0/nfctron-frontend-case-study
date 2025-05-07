import type { TransformedSeat } from '@/types/event.ts'
import { Button } from '@/components/ui/button.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import { cn } from '@/lib/utils.ts'
import React from 'react'

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
  seat: TransformedSeat
  disabled?: boolean
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>((props, ref) => {
  const isInCart = false
  return (
    <Popover>
      <PopoverTrigger
        disabled={props.disabled}
        className={cn('size-8 flex justify-center items-center rounded-full bg-green-500 hover:bg-green-700 data-[state=open]:bg-yellow-400 transition-color', props.className)}
      >
        <div
          ref={ref}
        >
          <span className="text-white">{props.seat.place}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <span>
            Seat number:
            {props.seat.place}
          </span>
          <span>
            Ticket type:
            {props.seat.type}
          </span>
          <span>
            Price:
            {props.seat.price}
          </span>
        </div>

        <footer className="flex flex-col">
          {
            isInCart
              ? (
                  <Button disabled variant="destructive" size="sm">
                    Remove from cart
                  </Button>
                )
              : (
                  <Button disabled variant="default" size="sm">
                    Add to cart
                  </Button>
                )
          }
        </footer>
      </PopoverContent>
    </Popover>
  )
})
