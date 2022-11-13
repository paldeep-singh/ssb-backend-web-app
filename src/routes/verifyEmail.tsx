import { FC, useState } from 'react'
// import { useLocation } from '../utils/navigation'
import { Logo } from '../components/Logo'
import { useNavigate, useLocation } from 'react-router-dom'
import { storeSessionCookie } from '../utils/sessionCookies'
import { CenterContainer, SubmitButton, VerticalSpacer } from '../components'

const VERIFICATION_CODE = 'Verification code'
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
  const navigate = useNavigate()

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
      const json = await response.json()
      storeSessionCookie(json)
      navigate('/set-password')
    } else {
      const json = await response.json()
      alert(json.message)
    }
    setLoading(false)
  }

  return (
    <CenterContainer>
      {loading ? (
        <h1>{LOADING}</h1>
      ) : (
        <>
          <Logo />
          <VerticalSpacer spacing="2">
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
              onChange={(event): void =>
                setVerificationCode(event.target.value)
              }
            />
            <SubmitButton onSubmit={onSubmit} />
          </VerticalSpacer>
        </>
      )}
    </CenterContainer>
  )
}

export default EmailVerificationScreen
