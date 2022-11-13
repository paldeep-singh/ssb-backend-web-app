import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { API_URL } from '../env'
import { getSessionCookie } from '../utils/sessionCookies'

const NEW_PASSWORD = 'New password'
const CONFIRM_PASSWORD = 'Confirm password'
const SUBMIT = 'Submit'

const SET_PASSWORD_API_URL = `${API_URL}/admin-user/set-password`

const passwordValidationRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/

export const SetPasswordScreen: FC = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (): Promise<void> => {
    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match')
      return
    }

    if (!passwordValidationRegex.test(newPassword)) {
      alert('Password does not meet requirements')
      return
    }

    const session = getSessionCookie()

    if (!session) {
      // TODO: Go to login screen
      alert('Session not found')
      return
    }

    const setPasswordResponse = await fetch(SET_PASSWORD_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        newPassword,
        confirmNewPassword
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session.id}`
      },
      mode: 'cors'
    })

    if (setPasswordResponse.ok) {
      alert('Password set, returning to login page.')
      navigate('/')

      return
    }

    alert('Something went wrong :/')
  }

  return (
    <div className="space-x-2 pt-6 text-center">
      <Logo />
      <div className="space-y-2">
        <p>
          {'Your password must be at least 8 characters long and contain an ' +
            'uppercase letter, a lowercase letter, and a number.'}
        </p>

        <label>{NEW_PASSWORD}</label>
        <input
          name="verificationCode"
          type="text"
          className="border-purple-700 border-2 ml-2"
          onChange={(event): void => setNewPassword(event.target.value)}
        />
        <label>{CONFIRM_PASSWORD}</label>
        <input
          name="verificationCode"
          type="text"
          className="border-purple-700 border-2 ml-2"
          onChange={(event): void => setConfirmNewPassword(event.target.value)}
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
