import { createRoot } from 'react-dom/client'
import React from 'react'
import { FC } from 'react'
import './index.css'
import LoginScreen from './features/login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const App: FC = () => {
  const router = createBrowserRouter([{ path: '/', element: <LoginScreen /> }])
  return <RouterProvider router={router} />
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
