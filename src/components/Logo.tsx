import { FC } from 'react'

import LogoSVG from '../assets/logo.svg'

export const Logo: FC<{ height?: number }> = ({ height = 300 }) => {
  return (
    <img
      src={LogoSVG}
      alt="Logo"
      className="block mx-auto"
      style={{ height: `${height}px` }}
    />
  )
}
