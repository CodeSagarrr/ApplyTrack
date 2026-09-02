import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { queryClient } from "./lib/queryClient.ts"
import { Toaster } from "react-hot-toast"
import { GoogleOAuthProvider} from "@react-oauth/google"
import App from './App.tsx'

const id = "884407284130-2csdvbkl5r4c8399slpnit2c0e228mbk.apps.googleusercontent.com"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={id}>
      <App />
      </GoogleOAuthProvider>
      <Toaster position='top-center' reverseOrder={false}/>
    </QueryClientProvider>
  </StrictMode>,
)
