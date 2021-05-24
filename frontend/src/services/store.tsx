import React, {createContext, useContext, useReducer, useCallback, useEffect} from 'react';
import {reducer, initialState} from '../reducers/index'
import CONSTANTS, {AuthActionTypes, TicketListActionTypes} from '../constants'
import {IAuthState, ITicket, ITicketListState} from '../interfaces'
import {request} from '../services/api'

type LoginType = (userRoles: string[], userName: string) => void
type LogoutType = () => void
type HasRoleType = (userRole: string) => boolean
type SetTicketListType = (tickets: {data: ITicket[], totalPages: number}) => void
type UpdateTicketListItemType = (ticket: ITicket) => void
type SetTicketListPageType = (page: number) => void
type SetTicketListStatusType = (status: number | null) => void
type SetTicketListLimitType = (limit: number) => void
type SetTicketListLoadingType = (loading: boolean) => void
type ContextType = {
  auth: IAuthState
  ticketList: ITicketListState
  hasRole: HasRoleType
  login: LoginType
  logout: LogoutType
  updateTicketListItem: UpdateTicketListItemType
  setTicketListPage: SetTicketListPageType
  setTicketListStatus: SetTicketListStatusType
  setTicketListLimit: SetTicketListLimitType
}

const initialStoreValues = {
  ...initialState,
  hasRole: () => false,
  login: () => {},
  logout: () => {},
  updateTicketListItem: () => {},
  setTicketListPage: () => {},
  setTicketListStatus: () => {},
  setTicketListLimit: () => {},
}

const StoreContext = createContext<ContextType>(initialStoreValues)

const useStore = () => {
  return useContext(StoreContext)
}

const StoreProvider: React.FC = ( { children } ) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {params: ticketListParams} = state.ticketList
  const {loggedIn, userRoles} = state.auth

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
  const hasRole: HasRoleType = (userRole) => userRoles.includes(userRole)
  const setTicketList: SetTicketListType = useCallback(({data, totalPages}) => {    
    dispatch({type: TicketListActionTypes.SET, data, totalPages})
  }, [])
  const updateTicketListItem: UpdateTicketListItemType = (ticket) => {
    dispatch({type: TicketListActionTypes.UPDATE_TICKET, ticket})
  }
  const setTicketListPage: SetTicketListPageType = useCallback((page) => {
    dispatch({type: TicketListActionTypes.SET_PAGE, page})
  }, [])
  const setTicketListStatus: SetTicketListStatusType = useCallback((status) => {
    dispatch({type: TicketListActionTypes.SET_STATUS, status})
  }, [])
  const setTicketListLimit: SetTicketListLimitType = useCallback((limit) => {
    dispatch({type: TicketListActionTypes.SET_LIMIT, limit})
  }, [])
  const setTicketListLoading: SetTicketListLoadingType = useCallback((loading) => {
    dispatch({type: TicketListActionTypes.SET_LOADING, loading})
  }, [])

  const getTickets = useCallback(params => {
    setTicketListLoading(true)
    request.get('/api/ticket', {params})
      .then(response => {
        if(response.data !== undefined) {
          setTicketList({data: response.data.data, totalPages: response.data.last_page})
        }
      })
      .catch(err => {})
      .then(() => setTicketListLoading(false))
  }, [setTicketList, setTicketListLoading])

  useEffect(()=>{
    if(loggedIn){
      getTickets(ticketListParams)
    }
  }, [getTickets, ticketListParams, loggedIn])

  const functions = {
    login,
    logout,
    hasRole,
    updateTicketListItem,
    setTicketListPage,
    setTicketListStatus,
    setTicketListLimit,
  }

  return <StoreContext.Provider value={{...state, ...functions }}>{children}</StoreContext.Provider>
}

export {StoreProvider, useStore}