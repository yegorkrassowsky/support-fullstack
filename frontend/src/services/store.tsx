import React, {createContext, useContext, useReducer, useCallback} from 'react';
import {reducer, initialState} from '../reducers/index'
import CONSTANTS, {AuthActionTypes, TicketListActionTypes} from '../constants'
import {IAuthState, ITicket, ITicketListState} from '../interfaces'

type LoginType = (userRoles: string[], userName: string) => void
type LogoutType = () => void
type HasRoleType = (userRole: string) => boolean
type SetTicketListType = (tickets: ITicketListState) => void
type UpdateTicketListItemType = (ticket: ITicket) => void
type ContextType = {
  auth: IAuthState
  ticketList: ITicketListState
  hasRole: HasRoleType
  login: LoginType
  logout: LogoutType
  setTicketList: SetTicketListType
  updateTicketListItem: UpdateTicketListItemType
}

const initialStoreValues = {
  ...initialState,
  hasRole: () => false,
  login: () => {},
  logout: () => {},
  setTicketList: () => {},
  updateTicketListItem: () => {},
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
    dispatch({type: CONSTANTS.INIT})
    sessionStorage.removeItem('loggedIn')
    sessionStorage.removeItem('userRoles')
    sessionStorage.removeItem('userName')
  }
  const hasRole: HasRoleType = (userRole) => auth.userRoles.includes(userRole)
  const setTicketList: SetTicketListType = useCallback(({data, totalPages}) => {    
    dispatch({type: TicketListActionTypes.SET, data, totalPages})
  }, [])
  const updateTicketListItem: UpdateTicketListItemType = (ticket) => {
    dispatch({type: TicketListActionTypes.UPDATE_TICKET, ticket})
  }
  const functions = {login, logout, hasRole, setTicketList, updateTicketListItem}

  return <StoreContext.Provider value={{...state, ...functions }}>{children}</StoreContext.Provider>
}

export {StoreProvider, useStore}