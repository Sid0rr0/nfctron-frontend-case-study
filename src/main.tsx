import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { CheckoutProvider } from './hooks/checkoutContext.tsx'
import { AuthProvider } from './hooks/userContext.tsx'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CheckoutProvider>
          <App />
        </CheckoutProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
