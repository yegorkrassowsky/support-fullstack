import { errorsReducer, loadingReducer } from '.'
import {AuthActionTypes} from '../constants'
import {IAuthState, IFormErrors, ILoading} from '../interfaces'

const initialLoginState = {
  loading: false,
  errors: null
}

export const authDefaults = {
  loggedIn: false,
  userName: '',
  userRoles: [],
  login: initialLoginState,
}

const savedRoles = sessionStorage.getItem('userRoles')

export const initialAuthState: IAuthState = {
  loggedIn: sessionStorage.getItem('loggedIn') === 'true' || authDefaults.loggedIn,
  userName: sessionStorage.getItem('userName') || authDefaults.userName,
  userRoles: savedRoles ? JSON.parse(savedRoles) : authDefaults.userRoles,
  login: authDefaults.login,
}

type AuthAction =
| {type: AuthActionTypes.LOGIN, userName: string, userRoles: string[]}
| {type: AuthActionTypes.SET_LOGIN_LOADING} & ILoading
| {type: AuthActionTypes.SET_LOGIN_ERRORS} & IFormErrors

const authReducer = (state: IAuthState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {...state, ...{
        loggedIn: true,
        userName: action.userName,
        userRoles: action.userRoles,
      }}
    case AuthActionTypes.SET_LOGIN_LOADING:
      return {...state, login: loadingReducer(state.login, action.loading)}
    case AuthActionTypes.SET_LOGIN_ERRORS:
      return {...state, login: errorsReducer(state.login, action.errors)}
    default:
      return state
  }
}

export default authReducer