import React, {createContext, useState, useContext, useCallback} from 'react';

type ContextType = {
  loggedIn: boolean
  userName: string
  hasRole: (role: string) => boolean
  login: (data: {}) => void
  logout: () => void
}

const storeContextDefaultValue = {
  loggedIn: sessionStorage.getItem('loggedIn') === 'true',
  userName: sessionStorage.getItem('userName') || '',
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
  const [userName, setUserName] = useState<string>(storeContextDefaultValue.userName)
  const savedRoles = sessionStorage.getItem('userRoles')
  const initialRoles = typeof savedRoles === 'string' ? JSON.parse(savedRoles) : []
  const [roles, setRoles] = useState<string[]>(initialRoles)
  const login = useCallback(({userRoles, userName}) => {
    setLoggedIn(true)
    setRoles(userRoles)
    setUserName(userName)
    sessionStorage.setItem('loggedIn', 'true')
    sessionStorage.setItem('userRoles', JSON.stringify(userRoles))
    sessionStorage.setItem('userName', userName)
  }, [])
  const logout = useCallback(() => {
    setLoggedIn(false)
    setRoles([])
    setUserName('')
    sessionStorage.setItem('loggedIn', 'false')
    sessionStorage.removeItem('userRoles')
    sessionStorage.removeItem('userName')
  }, [])
  const hasRole = useCallback((role) => roles.includes(role), [roles])
  return <StoreContext.Provider value={{loggedIn, userName, login, logout, hasRole}}>{children}</StoreContext.Provider>
}

export {StoreProvider, useStore}