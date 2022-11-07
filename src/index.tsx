import { createRoot } from 'react-dom/client'
import React from 'react'
import { FC } from 'react'
import './index.css'
import LoginScreen from './features/login'
import EmailVerificationScreen from './features/verifyEmail'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const App: FC = () => {
  const router = createBrowserRouter([
    { path: '/', element: <LoginScreen /> },
    {
      path: '/verify-email',
      element: <EmailVerificationScreen />
    }
  ])
  //   return (
  //   <div className="App">
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/blog" element={<Blog />} />
  //     </Routes>
  //   </div>
  // );
  return <RouterProvider router={router} />
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
