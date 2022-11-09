import { FC, useState } from 'react'
import Logo from '../assets/logo.svg'
import { API_URL } from '../env'
import Cookie from 'cookie-universal'

const NEW_PASSWORD = 'New password'
const CONFIRM_PASSWORD = 'Confirm password'
const SUBMIT = 'Submit'

const SET_PASSWORD_API_URL = `${API_URL}/admin-user/set-password`

const passwordValidationRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/

export const SetPasswordScreen: FC = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const cookie = Cookie()

  const onSubmit = async (): Promise<void> => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    if (!passwordValidationRegex.test(newPassword)) {
      alert('Password does not meet requirements')
      return
    }
  }

  return (
    <div className="space-x-2 pt-6 text-center">
      <img src={Logo} alt="Logo" className="block mx-auto" />
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
          onChange={(event): void => setConfirmPassword(event.target.value)}
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
