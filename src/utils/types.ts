interface ISessionData {
  userId: string
}

export interface ISession {
  sessionId: string
  sessionData: ISessionData
}

export const isSession = (maybeSession: unknown): maybeSession is ISession => {
  return (
    typeof maybeSession === 'object' &&
    maybeSession !== null &&
    typeof (maybeSession as ISession).sessionId === 'string' &&
    typeof (maybeSession as ISession).sessionData === 'object' &&
    (maybeSession as ISession).sessionData !== null &&
    typeof (maybeSession as ISession).sessionData.userId === 'string'
  )
}
