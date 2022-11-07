import { FC, useState } from 'react'
import Logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'

const EMAIL = 'Email'
const SUBMIT = 'Submit'

const API_URL = process.env.REACT_APP_API_URL ?? ''
const ADMIN_USER_ACCOUNT_CLAIMED_URL = `${API_URL}/admin-user/claimed`
const ADMIN_REQUEST_VERIFICATION_CODE_URL = `${API_URL}/admin-user/request-verification`

const LoginScreen: FC = () => {
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const onSubmit = async (): Promise<void> => {
    const claimResponse = await fetch(ADMIN_USER_ACCOUNT_CLAIMED_URL, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })

    const claimJSON = await claimResponse.json()

    if (!claimResponse.ok) {
      alert(claimJSON.message)
      return
    }

    if (
      claimJSON.accountClaimed === undefined ||
      claimJSON.accountClaimed === null
    ) {
      alert('Account claimed status not found')
      return
    }

    if (claimJSON.accountClaimed) {
      // TODO: GO to password screen
      return
    }

    const verificationRequestResponse = await fetch(
      ADMIN_REQUEST_VERIFICATION_CODE_URL,
      {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }
    )

    if (verificationRequestResponse.ok) {
      navigate('/verify-email', { state: { email } })
      return
    }

    const { message } = await verificationRequestResponse.json()

    alert(message)
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
