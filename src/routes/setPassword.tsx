import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Logo,
  CenterContainer,
  VerticalSpacer,
  SubmitButton,
  TextInput
} from '../components'
import { API_URL } from '../env'
import { getSessionCookie } from '../utils/sessionCookies'

const NEW_PASSWORD = 'New password'
const CONFIRM_PASSWORD = 'Confirm password'

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
      alert('Session not found, returning to login page')
      navigate('/')
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
    <CenterContainer>
      <Logo />
      <VerticalSpacer spacing="2">
        <p>
          {'Your password must be at least 8 characters long and contain an ' +
            'uppercase letter, a lowercase letter, and a number.'}
        </p>

        <TextInput
          label={NEW_PASSWORD}
          onChange={(event): void => setNewPassword(event.target.value)}
        />
        <TextInput
          label={CONFIRM_PASSWORD}
          onChange={(event): void => setConfirmNewPassword(event.target.value)}
        />
        <SubmitButton onSubmit={onSubmit} />
      </VerticalSpacer>
    </CenterContainer>
  )
}
