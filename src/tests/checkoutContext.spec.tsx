import type { TransformedSeat } from '@/types/event'
import { CheckoutActionType, CheckoutProvider, useCheckout } from '@/hooks/checkoutContext'
import { act, render, renderHook, screen } from '@testing-library/react'
import React from 'react'

// Mock data
const mockSeat1: TransformedSeat = {
  seatId: 'seat-1',
  place: 101,
  ticketTypeId: 'type-1',
  seatRow: 1,
  type: 'standard',
  price: 100,
}

const mockSeat2: TransformedSeat = {
  seatId: 'seat-2',
  place: 102,
  ticketTypeId: 'type-1',
  seatRow: 1,
  type: 'premium',
  price: 150,
}

describe('checkoutContext', () => {
  // Tests for useCheckout hook
  describe('useCheckout', () => {
    it('throws error when used outside of CheckoutProvider', () => {
      // Silence console.error for this test
      const originalError = console.error
      console.error = jest.fn()

      // Using renderHook to test the hook in isolation
      expect(() => {
        renderHook(() => useCheckout())
      }).toThrow('useCheckout must be used within a CheckoutProvider')

      // Restore console.error
      console.error = originalError
    })

    it('provides state and dispatch', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CheckoutProvider>{children}</CheckoutProvider>
      )

      const { result } = renderHook(() => useCheckout(), { wrapper })

      expect(result.current.state).toEqual({
        eventId: '',
        count: 0,
        totalPrice: 0,
        selectedSeats: [],
      })
      expect(typeof result.current.dispatch).toBe('function')
    })
  })

  // Tests for reducer actions
  describe('checkoutReducer', () => {
    // Test ADD action
    it('handles ADD action correctly', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CheckoutProvider>{children}</CheckoutProvider>
      )

      const { result } = renderHook(() => useCheckout(), { wrapper })

      act(() => {
        result.current.dispatch({
          type: CheckoutActionType.ADD,
          seat: mockSeat1,
        })
      })

      expect(result.current.state).toEqual({
        eventId: '',
        count: 1,
        totalPrice: 100,
        selectedSeats: [mockSeat1],
      })

      // Add another seat
      act(() => {
        result.current.dispatch({
          type: CheckoutActionType.ADD,
          seat: mockSeat2,
        })
      })

      expect(result.current.state).toEqual({
        eventId: '',
        count: 2,
        totalPrice: 250, // 100 + 150
        selectedSeats: [mockSeat1, mockSeat2],
      })
    })

    // Test REMOVE action
    it('handles REMOVE action correctly', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CheckoutProvider>{children}</CheckoutProvider>
      )

      const { result } = renderHook(() => useCheckout(), { wrapper })

      // Add two seats first
      act(() => {
        result.current.dispatch({
          type: CheckoutActionType.ADD,
          seat: mockSeat1,
        })
      })

      act(() => {
        result.current.dispatch({
          type: CheckoutActionType.ADD,
          seat: mockSeat2,
        })
      })

      // Now remove one seat
      act(() => {
        result.current.dispatch({
          type: CheckoutActionType.REMOVE,
          seat: mockSeat1,
        })
      })

      expect(result.current.state).toEqual({
        eventId: '',
        count: 1,
        totalPrice: 150,
        selectedSeats: [mockSeat2], // Only mockSeat2 should remain
      })
    })

    // Test SET_EVENT_ID action
    it('handles SET_EVENT_ID action correctly', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CheckoutProvider>{children}</CheckoutProvider>
      )

      const { result } = renderHook(() => useCheckout(), { wrapper })

      act(() => {
        result.current.dispatch({
          type: CheckoutActionType.SET_EVENT_ID,
          eventId: 'event-123',
        })
      })

      expect(result.current.state.eventId).toBe('event-123')
    })

    // Test SET_EVENT_ID with falsy value
    it('keeps current eventId when SET_EVENT_ID receives falsy value', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CheckoutProvider>{children}</CheckoutProvider>
      )

      const { result } = renderHook(() => useCheckout(), { wrapper })

      // Set an initial eventId
      act(() => {
        result.current.dispatch({
          type: CheckoutActionType.SET_EVENT_ID,
          eventId: 'event-123',
        })
      })

      // Try to set with empty string
      act(() => {
        result.current.dispatch({
          type: CheckoutActionType.SET_EVENT_ID,
          eventId: '',
        })
      })

      // Should keep the previous value
      expect(result.current.state.eventId).toBe('event-123')
    })

    // Test CLEAR action
    it('handles CLEAR action correctly', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CheckoutProvider>{children}</CheckoutProvider>
      )

      const { result } = renderHook(() => useCheckout(), { wrapper })

      // Add two seats and set event ID
      act(() => {
        result.current.dispatch({
          type: CheckoutActionType.SET_EVENT_ID,
          eventId: 'event-123',
        })
      })

      act(() => {
        result.current.dispatch({
          type: CheckoutActionType.ADD,
          seat: mockSeat1,
        })
      })

      act(() => {
        result.current.dispatch({
          type: CheckoutActionType.ADD,
          seat: mockSeat2,
        })
      })

      // Now clear the checkout
      act(() => {
        result.current.dispatch({
          type: CheckoutActionType.CLEAR,
        })
      })

      expect(result.current.state).toEqual({
        eventId: 'event-123', // eventId should be preserved
        count: 0,
        totalPrice: 0,
        selectedSeats: [],
      })
    })
  })

  // Test component integration
  describe('component integration', () => {
    const TestComponent = () => {
      const { state, dispatch } = useCheckout()

      return (
        <div>
          <span data-testid="count">{state.count}</span>
          <span data-testid="total-price">{state.totalPrice}</span>
          <span data-testid="event-id">{state.eventId}</span>
          <span data-testid="seats">{state.selectedSeats.length}</span>
          <button
            data-testid="add-seat"
            onClick={() => dispatch({ type: CheckoutActionType.ADD, seat: mockSeat1 })}
          >
            Add Seat
          </button>
          <button
            data-testid="clear"
            onClick={() => dispatch({ type: CheckoutActionType.CLEAR })}
          >
            Clear
          </button>
        </div>
      )
    }

    it('works correctly in a component context', async () => {
      render(
        <CheckoutProvider>
          <TestComponent />
        </CheckoutProvider>,
      )

      // Initial state
      expect(screen.getByTestId('count').textContent).toBe('0')
      expect(screen.getByTestId('total-price').textContent).toBe('0')
      expect(screen.getByTestId('seats').textContent).toBe('0')

      // Add a seat
      const addButton = screen.getByTestId('add-seat')

      await act(async () => {
        addButton.click()
      })

      expect(screen.getByTestId('count').textContent).toBe('1')
      expect(screen.getByTestId('total-price').textContent).toBe('100')
      expect(screen.getByTestId('seats').textContent).toBe('1')

      // Clear the checkout
      const clearButton = screen.getByTestId('clear')
      await act(async () => {
        clearButton.click()
      })

      // Check that state was cleared
      expect(screen.getByTestId('count').textContent).toBe('0')
      expect(screen.getByTestId('total-price').textContent).toBe('0')
      expect(screen.getByTestId('seats').textContent).toBe('0')
    })
  })
})
