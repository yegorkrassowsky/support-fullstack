import React, {createContext, useState, useContext, useCallback} from 'react';
import apiClient from './services/api'

type ContextType = {
  loggedIn: boolean
  login: () => void
  logout: () => void
}

const storeContextDefaultValue: ContextType = {
  loggedIn: sessionStorage.getItem('loggedIn') === 'true',
  login: () => {},
  logout: () => {},
}

const StoreContext = createContext<ContextType>(storeContextDefaultValue)

const useStore = () => {
  return useContext(StoreContext)
}

const StoreProvider: React.FC = ( { children } ) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(storeContextDefaultValue.loggedIn)
  const login = useCallback(() => {
    setLoggedIn(true)
    sessionStorage.setItem('loggedIn', 'true')
  }, [])
  const logout = useCallback(() => {
    apiClient.post('/logout')
      .then(response => {
        if(response.status === 204){
          setLoggedIn(false)
          sessionStorage.setItem('loggedIn', 'false')
        }
      })
  }, [])

  return <StoreContext.Provider value={{loggedIn, login, logout}}>{children}</StoreContext.Provider>
}

export {StoreProvider, useStore}