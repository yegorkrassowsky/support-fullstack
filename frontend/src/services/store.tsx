import React, {createContext, useContext, useReducer} from 'react';
import {reducer, initialState} from '../reducers/index'
import {AuthActionTypes} from '../constants'
import {IAuth} from '../interfaces'

type LoginType = (userRoles: string[], userName: string) => void
type LogoutType = () => void
type HasRoleType = (userRole: string) => boolean

type ContextType = {
  auth: IAuth
  hasRole: HasRoleType
  login: LoginType
  logout: LogoutType
}

const initialStoreValues = {
  ...initialState,
  hasRole: () => false,
  login: () => {},
  logout: () => {},
}

const StoreContext = createContext<ContextType>(initialStoreValues)

const useStore = () => {
  return useContext(StoreContext)
}

const StoreProvider: React.FC = ( { children } ) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {auth} = state

  const login: LoginType = (userRoles, userName) => {
    dispatch({
      type: AuthActionTypes.LOGIN,
      userRoles,
      userName
    })
    sessionStorage.setItem('loggedIn', 'true')
    sessionStorage.setItem('userRoles', JSON.stringify(userRoles))
    sessionStorage.setItem('userName', userName)

  }
  const logout: LogoutType = () => {
    dispatch({type: AuthActionTypes.LOGOUT})
    sessionStorage.removeItem('loggedIn')
    sessionStorage.removeItem('userRoles')
    sessionStorage.removeItem('userName')
  }
  const hasRole: HasRoleType = (userRole) => auth.userRoles.includes(userRole)
  const functions = {login, logout, hasRole}

  return <StoreContext.Provider value={{...state, ...functions }}>{children}</StoreContext.Provider>
}

export {StoreProvider, useStore}