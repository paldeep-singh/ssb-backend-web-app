import { FC, ReactNode } from 'react'

export const CenterContainer: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <div className="space-x-2 pt-6 text-center justify-center align-middle flex-center">
      {children}
    </div>
  )
}
