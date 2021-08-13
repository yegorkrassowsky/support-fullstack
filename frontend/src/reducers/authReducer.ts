import {loadingReducer} from '.'
import {AuthActionTypes} from '../constants'
import {IAuthState} from '../interfaces'
import {AuthAction} from '../types'

const initialLoginState = {
  loading: false,
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

const authReducer = (state: IAuthState = initialAuthState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {...state, ...{
        loggedIn: true,
        userName: action.userName,
        userRoles: action.userRoles,
      }}
    case AuthActionTypes.SET_LOGIN_LOADING:
      return {...state, login: loadingReducer(state.login, action.loading)}
    default:
      return state
  }
}

export default authReducer