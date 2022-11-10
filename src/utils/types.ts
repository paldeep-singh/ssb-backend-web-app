interface ISessionData {
  userId: string
}

export interface ISession {
  id: string
  data: ISessionData
}

export const isSession = (maybeSession: unknown): maybeSession is ISession => {
  return (
    typeof maybeSession === 'object' &&
    maybeSession !== null &&
    'id' in maybeSession &&
    'data' in maybeSession &&
    'userId' in (maybeSession as ISession).data
  )
}
