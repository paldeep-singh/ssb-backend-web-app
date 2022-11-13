import { FC, useState } from 'react'
import { Logo, CenterContainer, VerticalSpacer } from '../components'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../env'
import { storeSessionCookie } from '../utils/sessionCookies'

const EMAIL = 'Email'
const SUBMIT = 'Submit'
const PASSWORD = 'Password'

const ADMIN_USER_ACCOUNT_CLAIMED_URL = `${API_URL}/admin-user/claimed`
const ADMIN_REQUEST_VERIFICATION_CODE_URL = `${API_URL}/admin-user/request-verification`
const ADMIN_LOGIN_URL = `${API_URL}/admin-user/login`

const LoginScreen: FC = () => {
  const [email, setEmail] = useState('')
  const [accountClaimed, setAccountClaimed] = useState(false)
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSubmitEmail = async (): Promise<void> => {
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
      setAccountClaimed(true)
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

  const onSubmitPassword = async (): Promise<void> => {
    const loginResponse = await fetch(ADMIN_LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })
    if (loginResponse.ok) {
      const session = await loginResponse.json()

      storeSessionCookie(session)
      alert('Login successful')
      // TODO: navigate to home page
      // navigate('/home')

      return
    }

    const { message } = await loginResponse.json()

    alert(message)
  }

  return (
    <CenterContainer>
      <Logo />
      <VerticalSpacer spacing="2">
        <label>{EMAIL}</label>
        <input
          name="email"
          type="text"
          className="border-purple-700 border-2 ml-2"
          onChange={(event): void => setEmail(event.target.value)}
        />
        {accountClaimed && (
          <>
            <label>{PASSWORD}</label>
            <input
              name="password"
              type="text"
              className="border-purple-700 border-2 ml-2"
              onChange={(event): void => setPassword(event.target.value)}
            />
          </>
        )}
        <button
          className="bg-orange-200 border-4 border-purple-400 p-2 block mx-auto"
          onClick={accountClaimed ? onSubmitPassword : onSubmitEmail}>
          {SUBMIT}
        </button>
      </VerticalSpacer>
    </CenterContainer>
  )
}

export default LoginScreen
