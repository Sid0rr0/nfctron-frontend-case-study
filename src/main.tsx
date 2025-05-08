import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { CheckoutProvider } from './hooks/checkoutContext.tsx'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CheckoutProvider>
        <App />
      </CheckoutProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
