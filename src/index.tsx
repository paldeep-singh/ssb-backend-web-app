import { createRoot } from 'react-dom/client'
import React from 'react'
import { FC } from 'react'
import './index.css'
import LoginScreen from './features/login'

export const App: FC = () => {
  return <LoginScreen />
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
