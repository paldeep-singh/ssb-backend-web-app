import Cookie from 'cookie-universal'
import { ISession, isSession } from './types'

const cookie = Cookie()

export const storeSessionCookie = (session: string): void => {
  cookie.set('session', JSON.stringify(session))
}

export const getSessionCookie = (): ISession | null => {
  const sessionString = cookie.get('session')
  if (sessionString) {
    const session = JSON.parse(sessionString)

    if (isSession(session)) {
      return session
    }

    return null
  }
  return null
}
