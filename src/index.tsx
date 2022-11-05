import ReactDOM from 'react-dom'
import { FC } from 'react'
import './index.css'
import LoginScreen from './features/login'

export const App: FC = () => {
  return <LoginScreen />
}
ReactDOM.render(<App />, document.getElementById('root'))
