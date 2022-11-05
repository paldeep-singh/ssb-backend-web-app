import { FC, useState } from 'react'
import Logo from '../assets/logo.svg'

const EMAIL = 'Email'
const SUBMIT = 'Submit'

const API_URL = process.env.REACT_APP_API_URL ?? ''

const LoginScreen: FC = () => {
  const [email, setEmail] = useState('')

  const onSubmit = async (): Promise<void> => {
    const response = await fetch(`${API_URL}/admin-user/claimed`, {
      method: 'POST',
      body: JSON.stringify({ email })
    })

    console.log(response)
  }

  return (
    <div className="space-x-2 pt-6 text-center">
      <img src={Logo} alt="Logo" className="block mx-auto" />
      <div className="space-y-2">
        <label>{EMAIL}</label>
        <input
          name="email"
          type="text"
          className="border-purple-700 border-2 ml-2"
          onChange={(event): void => setEmail(event.target.value)}
        />
        <button
          className="bg-orange-200 border-4 border-purple-400 p-2 block mx-auto"
          onClick={onSubmit}>
          {SUBMIT}
        </button>
      </div>
    </div>
  )
}

export default LoginScreen
