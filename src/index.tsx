import ReactDOM from 'react-dom'
import { FC } from 'react'
import './index.css'

const HELLO_WORLD = 'Hello World'

export const App: FC = () => {
  return (
    <div className="flex justify-center">
      <h1 className="text-3xl font-bold underline">{HELLO_WORLD}</h1>

      <input id="name" type="text" />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
