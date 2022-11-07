import { FC, useState } from 'react'
// import { useLocation } from '../utils/navigation'
import Logo from '../assets/logo.svg'
import { useLocation } from 'react-router-dom'

const VERIFICATION_CODE = 'Verification code'
const SUBMIT = 'Submit'
const LOADING = 'Loading...'

const API_URL = process.env.REACT_APP_API_URL ?? ''
const ADMIN_VERIFY_EMAIL_URL = `${API_URL}/admin-user/verify-email`

// FIgure out how to type-safe state
// interface LocationState {
//   email: string
// }

const EmailVerificationScreen: FC = () => {
  const [loading, setLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')

  const location = useLocation()

  const email = location.state.email

  const onSubmit = async (): Promise<void> => {
    setLoading(true)
    const response = await fetch(ADMIN_VERIFY_EMAIL_URL, {
      method: 'POST',
      body: JSON.stringify({ email, verificationCode }),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })

    if (response.ok) {
      // const json = await response.json()
      // TODO: Go to set password screen
      // + Set session cookie?
      // console.log('Email verified!', json)
    } else {
      const json = await response.json()
      alert(json.message)
    }
    setLoading(false)
  }

  return loading ? (
    <div className="space-x-2 pt-6 text-center">
      <h1>{LOADING}</h1>
    </div>
  ) : (
    <div className="space-x-2 pt-6 text-center">
      <img src={Logo} alt="Logo" className="block mx-auto" />
      <div className="space-y-2">
        <p>
          {`We've sent an email containing your verification code to ${email}. ` +
            `Check your spam folder if you do not see it in your inbox. ` +
            `If you have not received anything, you know who to call.`}
        </p>
        <label>{VERIFICATION_CODE}</label>
        <input
          name="verificationCode"
          type="text"
          className="border-purple-700 border-2 ml-2"
          onChange={(event): void => setVerificationCode(event.target.value)}
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

export default EmailVerificationScreen