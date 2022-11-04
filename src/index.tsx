import ReactDOM from 'react-dom'
import { FC } from 'react'
import './index.css'

const EMAIL = 'Email'

export const App: FC = () => {
  return (
    <div className="space-x-2 pt-6 text-center">
      <label>{EMAIL}</label>
      <input name="email" type="text" className="border-purple-700 border-2" />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
