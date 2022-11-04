import ReactDOM from 'react-dom'
import { FC } from 'react'
import './index.css'
import Logo from './assets/logo.svg'

const EMAIL = 'Email'

export const App: FC = () => {
  return (
    <div className="space-x-2 pt-6 text-center">
      <img src={Logo} alt="Logo" className="block mx-auto" />
      <label>{EMAIL}</label>
      <input name="email" type="text" className="border-purple-700 border-2" />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
