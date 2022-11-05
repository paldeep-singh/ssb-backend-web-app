import { FC, useEffect, useState } from 'react'
import Logo from '../assets/logo.svg'

const VERIFICATION_CODE = 'Verification code'
const SUBMIT = 'Submit'
const LOADING = 'Loading...'

const API_URL = process.env.REACT_APP_API_URL ?? ''
const ADMIN_REQUEST_VERIFICATION_CODE_URL = `${API_URL}/admin-user/request-verification`
const ADMIN_VERIFY_EMAIL_URL = `${API_URL}/admin-user/verify-email`

type IEmailVerificationProps = {
  email: string
}

const EmailVerificationScreen: FC<IEmailVerificationProps> = ({ email }) => {
  const [loading, setLoading] = useState(true)
  const [verificationCode, setVerificationCode] = useState('')

  useEffect(() => {
    const requestVerificationCode = async (): Promise<void> => {
      await fetch(ADMIN_REQUEST_VERIFICATION_CODE_URL, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
      setLoading(false)
    }

    requestVerificationCode()
  })

  const onSubmit = async (): Promise<void> => {
    await fetch(ADMIN_VERIFY_EMAIL_URL, {
      method: 'POST',
      body: JSON.stringify({ email, verificationCode }),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })
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
