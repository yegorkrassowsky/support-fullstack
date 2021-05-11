import React, {createContext, useState, useContext, useCallback} from 'react';
import {userRoles} from './constants'

type ContextType = {
  loggedIn: boolean
  hasRole: (role: string) => boolean
  login: (roles: []) => void
  logout: () => void
}

const storeContextDefaultValue = {
  loggedIn: sessionStorage.getItem('loggedIn') === 'true',
  hasRole: () => false,
  login: () => {},
  logout: () => {},
}

const StoreContext = createContext<ContextType>(storeContextDefaultValue)

const useStore = () => {
  return useContext(StoreContext)
}

const StoreProvider: React.FC = ( { children } ) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(storeContextDefaultValue.loggedIn)
  const savedRoles = sessionStorage.getItem('userRoles')
  const initialRoles = typeof savedRoles === 'string' ? JSON.parse(savedRoles) : []
  const [roles, setRoles] = useState<string[]>(initialRoles)
  const login = useCallback((roles) => {
    setLoggedIn(true)
    setRoles(roles)
    sessionStorage.setItem('loggedIn', 'true')
    sessionStorage.setItem('userRoles', JSON.stringify(roles))
  }, [])
  const logout = useCallback(() => {
    setLoggedIn(false)
    setRoles([])
    sessionStorage.setItem('loggedIn', 'false')
    sessionStorage.removeItem('userRoles')
  }, [])
  const hasRole = useCallback((role) => roles.includes(role), [roles])
  return <StoreContext.Provider value={{loggedIn, login, logout, hasRole}}>{children}</StoreContext.Provider>
}

export {StoreProvider, useStore}