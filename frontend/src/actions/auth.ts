import {AuthActionTypes, RootActionTypes} from '../constants'
import {request} from '../services/store'
import {
  LoginThunkType,
  LogoutThunkType,
  LoginUserActionCreatorType,
  LoadingActionCreatorType,
  ThunkDispatchType
} from '../types'

import { FORM_ERROR } from 'final-form'

export const login: LoginThunkType = ({email, password}) => {
  return (dispatch: ThunkDispatchType) => {
    dispatch(loginLoading(true))
    return request.get('/sanctum/csrf-cookie')
      .then(response => {
        return request.post('/login', {email, password})
          .then(response => {
            if(response.status === 200 && response.data !== undefined) {
              const {userName, userRoles} = response.data
              dispatch(loginUser({userName, userRoles}))
              dispatch(loginLoading(false))
              sessionStorage.setItem('loggedIn', 'true')
              sessionStorage.setItem('userName', userName)
              sessionStorage.setItem('userRoles', JSON.stringify(userRoles))
            }
          })
          .catch(err => {
            if(err.response !== undefined && err.response.status === 422 && err.response.data.errors !== undefined){
              dispatch(loginLoading(false))
              return Promise.resolve(err.response.data.errors)
            }
          })
      })
      .catch(() => {
        dispatch(loginLoading(false))
        return Promise.resolve({[FORM_ERROR]: 'Login failed. Please, try again later.'})
      })
  }
}

export const logout: LogoutThunkType = () => {
  return (dispatch: ThunkDispatchType) => {
    request.post('/logout')
      .then(response => {
        if(response.status === 204){
          dispatch({type: RootActionTypes.INIT})
          sessionStorage.removeItem('loggedIn')
          sessionStorage.removeItem('userRoles')
          sessionStorage.removeItem('userName')
        }
      })
      .catch(err => {})
  }
}

const loginUser: LoginUserActionCreatorType = ({userName, userRoles}) => ({type: AuthActionTypes.LOGIN, userName, userRoles})
const loginLoading: LoadingActionCreatorType = (loading) => ({type: AuthActionTypes.SET_LOGIN_LOADING, loading})