import Cookie from 'cookie-universal'
import { ISession, isSession } from './types'

const cookie = Cookie()

export const storeSessionCookie = (session: unknown): void => {
  if (isSession(session)) {
    cookie.set('session', session)
    return
  }

  throw new Error('Invalid session')
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
