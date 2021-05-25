import {AuthActionTypes} from '../constants'
import {IAuthState} from '../interfaces'

export const authDefaults = {
  loggedIn: false,
  userName: '',
  userRoles: []
}

const savedRoles = sessionStorage.getItem('userRoles')

export const initialAuthState: IAuthState = {
  loggedIn: sessionStorage.getItem('loggedIn') === 'true' || authDefaults.loggedIn,
  userName: sessionStorage.getItem('userName') || authDefaults.userName,
  userRoles: savedRoles ? JSON.parse(savedRoles) : authDefaults.userRoles
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