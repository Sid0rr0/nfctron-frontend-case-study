import type { OrderResponse } from '@/types/order'
import React from 'react'

interface OrderSummaryProps {
  data: OrderResponse
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ data }) => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmation</h2>

      <div className="mb-4">
        <p>
          <span className="font-semibold text-gray-700">Message:</span>
          {' '}
          {data.message}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Order ID:</span>
          {' '}
          {data.orderId}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Total Amount:</span>
          {' '}
          $
          {data.totalAmount.toFixed(2)}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">User Info</h3>
        <p>
          <span className="font-semibold text-gray-700">Name:</span>
          {' '}
          {data.user.firstName}
          {' '}
          {data.user.lastName}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Email:</span>
          {' '}
          {data.user.email}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Tickets</h3>
        {data.tickets.length === 0
          ? (
              <p className="text-gray-600">No tickets associated with this order.</p>
            )
          : (
              <ul className="space-y-3">
                {data.tickets.map((ticket, index) => (
                  <li key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p>
                      <span className="font-semibold">
                        Ticket #
                        {index + 1}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-700">Ticket Type ID:</span>
                      {' '}
                      {ticket.ticketTypeId}
                    </p>
                    <p>
                      <span className="text-gray-700">Seat ID:</span>
                      {' '}
                      {ticket.seatId}
                    </p>
                  </li>
                ))}
              </ul>
            )}
      </div>
    </div>
  )
}

export default OrderSummary
