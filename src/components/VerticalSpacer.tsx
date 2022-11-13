import { ReactNode, FC } from 'react'
import tailwindTheme from 'tailwindcss/defaultTheme'

type ISpacing = keyof typeof tailwindTheme.spacing

export const VerticalSpacer: FC<{ children: ReactNode; spacing: ISpacing }> = ({
  children,
  spacing
}) => {
  return <div className={`space-y-${spacing}`}>{children}</div>
}
