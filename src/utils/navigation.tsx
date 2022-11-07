import {
  useLocation as baseUseLocation,
  Location as baseLocation
} from 'react-router-dom'

export interface Location<State = Record<string, string | boolean | number>>
  extends baseLocation {
  state: State
}

export const useLocation = <T,>(): Location<T> =>
  baseUseLocation as unknown as Location<T>
