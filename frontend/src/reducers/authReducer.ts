import {AuthActionTypes} from '../constants'

type AuthState = {
  loggedIn: boolean
  userName: string
  userRoles: string[]
}

const defaults = {
  loggedIn: false,
  userName: '',
  userRoles: []
}

const savedRoles = sessionStorage.getItem('userRoles')

export const initialAuthState: AuthState = {
  loggedIn: sessionStorage.getItem('loggedIn') === 'true' || defaults.loggedIn,
  userName: sessionStorage.getItem('userName') || defaults.userName,
  userRoles: savedRoles ? JSON.parse(savedRoles) : defaults.userRoles
}

type AuthAction =
| {type: AuthActionTypes.LOGIN, userName: string, userRoles: string[]}
| {type: AuthActionTypes.LOGOUT}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        loggedIn: true,
        userName: action.userName,
        userRoles: action.userRoles,
      }
    case AuthActionTypes.LOGOUT:
      return defaults
    default:
      return state
  }
}

export default authReducer