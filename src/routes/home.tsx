import { FC } from 'react'
import { CenterContainer, Logo, VerticalSpacer } from '../components'

export const HomeScreen: FC = () => {
  return (
    <CenterContainer>
      <VerticalSpacer spacing="4">
        <Logo />
        <h1 className="text-4xl font-bold">Welcome to the home page!</h1>
      </VerticalSpacer>
    </CenterContainer>
  )
}
