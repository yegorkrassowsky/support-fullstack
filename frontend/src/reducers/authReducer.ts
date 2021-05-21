import {AuthActionTypes} from '../constants'
import {IAuthState} from '../interfaces'

const defaults = {
  loggedIn: false,
  userName: '',
  userRoles: []
}

const savedRoles = sessionStorage.getItem('userRoles')

export const initialAuthState: IAuthState = {
  loggedIn: sessionStorage.getItem('loggedIn') === 'true' || defaults.loggedIn,
  userName: sessionStorage.getItem('userName') || defaults.userName,
  userRoles: savedRoles ? JSON.parse(savedRoles) : defaults.userRoles
}

type AuthAction =
| {type: AuthActionTypes.LOGIN, userName: string, userRoles: string[]}

const authReducer = (state: IAuthState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        loggedIn: true,
        userName: action.userName,
        userRoles: action.userRoles,
      }
    default:
      return state
  }
}

export default authReducer