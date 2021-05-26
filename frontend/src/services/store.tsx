import React, {createContext, useContext, useReducer, useCallback, useEffect} from 'react';
import {reducer, initialState} from '../reducers/index'
import CONSTANTS, {AuthActionTypes, TicketListActionTypes, TicketActionTypes} from '../constants'
import {IAuthState, ITicket, ITicketListState, ITicketState, ITicketWithResponse, ITicketWithResponses} from '../interfaces'
import {request} from '../services/api'
import {FormErrorsType} from '../types'

type DispatchLoadingType = (loading: boolean) => void
type DispatchErrorsType = (errors: FormErrorsType) => void
type LoginType = (userRoles: string[], userName: string) => void
type LogoutType = () => void
type HasRoleType = (userRole: string) => boolean
type SetTicketListType = (tickets: {data: ITicket[], totalPages: number}) => void
type SetTicketListPageType = (page: number) => void
type SetTicketListStatusType = (status: number | null) => void
type SetTicketListLimitType = (limit: number) => void
type SetTicketListItemType = (ticket: ITicket) => void
type SetTicketListItemLoadingType = (id: number, loading: boolean) => void
type TakeTicketType = (id: number) => void
type AddResponseType = (ticketId: number, content: string, onSuccess: Function) => void
type AddTicketResponseItemType = (data: ITicketWithResponse) => void
type SetTicketPageDataType = (ticket: ITicketWithResponses) => void
type SetTicketPageType = (ticketId: number, page: number) => void
type SetTicketDataType = (data: ITicket) => void
type ChangeStatusType = (ticketId: number, status: number) => void
type ContextType = {
  auth: IAuthState
  ticketList: ITicketListState
  ticket: ITicketState
  hasRole: HasRoleType
  login: LoginType
  logout: LogoutType
  setTicketListPage: SetTicketListPageType
  setTicketListStatus: SetTicketListStatusType
  setTicketListLimit: SetTicketListLimitType
  setTicketListItem: SetTicketListItemType
  takeTicket: TakeTicketType
  addResponse: AddResponseType
  setTicketPage: SetTicketPageType
  changeStatus: ChangeStatusType
}

const initialStoreValues = {
  ...initialState,
  hasRole: () => false,
  login: () => {},
  logout: () => {},
  setTicketListPage: () => {},
  setTicketListStatus: () => {},
  setTicketListLimit: () => {},
  setTicketListItem: () => {},
  takeTicket: () => {},
  addResponse: () => {},
  setTicketPage: () => {},
  changeStatus: () => {}
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

  const setTicketListPage: SetTicketListPageType = useCallback((page) => {
    dispatch({type: TicketListActionTypes.SET_PAGE, page})
  }, [])

  const setTicketListStatus: SetTicketListStatusType = useCallback((status) => {
    dispatch({type: TicketListActionTypes.SET_STATUS, status})
  }, [])

  const setTicketListLimit: SetTicketListLimitType = useCallback((limit) => {
    dispatch({type: TicketListActionTypes.SET_LIMIT, limit})
  }, [])

  const setTicketListLoading: DispatchLoadingType = useCallback((loading) => {
    dispatch({type: TicketListActionTypes.SET_LOADING, loading})
  }, [])

  const setTicketListItemLoading: SetTicketListItemLoadingType = useCallback((id, loading) => {
    dispatch({type: TicketListActionTypes.SET_ITEM_LOADING, id, loading})
  }, [])

  const setTicketListItem: SetTicketListItemType = useCallback((ticket) => {
    dispatch({type: TicketListActionTypes.SET_ITEM, ticket})
  }, [])

  const setAddResponseLoading: DispatchLoadingType = useCallback(loading => {
    dispatch({type: TicketActionTypes.SET_ADD_RESPONSE_LOADING, loading})
  }, [])

  const setAddResponseErrors: DispatchErrorsType = useCallback((errors) => {
    dispatch({type: TicketActionTypes.SET_ADD_RESPONSE_ERRORS, errors})
  }, [])

  const addTicketResponseItem: AddTicketResponseItemType = useCallback((data) => {
    dispatch({type: TicketActionTypes.ADD_RESPONSE, data})
    dispatch({type: TicketListActionTypes.SET_ITEM, ticket: data.ticket})
  }, [])

  const setTicketLoading: DispatchLoadingType = useCallback(loading => {
    dispatch({type: TicketActionTypes.SET_LOADING, loading})
  }, [])

  const setChangeStatusLoading: DispatchLoadingType = useCallback(loading => {
    dispatch({type: TicketActionTypes.SET_CHANGE_STATUS_LOADING, loading})
  }, [])

  const setTicketPageData: SetTicketPageDataType = useCallback(ticket => {
    dispatch({type: TicketActionTypes.SET, ticket})
  }, [])

  const setTicketData: SetTicketDataType = useCallback((data) => {
    dispatch({type: TicketActionTypes.SET_TICKET, data})
    dispatch({type: TicketListActionTypes.SET_ITEM, ticket: data})
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

  const takeTicket: TakeTicketType = useCallback((id) => {
    setTicketListItemLoading(id, true)
    request.put(`/api/ticket/${id}`, {status: 1})
      .then(response => {
        if(response.data !== undefined) {
          setTicketListItem(response.data)
        }
      })
      .catch(err => {})
  }, [setTicketListItem, setTicketListItemLoading])

  const setTicketPage: SetTicketPageType = useCallback((ticketId, page) => {
    setTicketLoading(true)
    request.get(`/api/ticket/${ticketId}`, {params: {page}})
      .then(response => {
        if(response.data !== undefined) {
          setTicketPageData({
            data: response.data.ticket,
            responses: response.data.responses.data,
            totalPages: response.data.responses.last_page
          })
        }
      })
      .catch(err => {})
      .then(() => {
        setTicketLoading(false)
      })
  }, [setTicketPageData, setTicketLoading])

  const addResponse: AddResponseType = useCallback((ticketId, content, onSuccess = () => {}) => {
    setAddResponseLoading(true)
    request.post('/api/response', {ticket_id: ticketId, content})
      .then(response => {
        if(response.data !== undefined) {
          addTicketResponseItem(response.data)
        }
        setAddResponseLoading(false)
        setAddResponseErrors(null)
        onSuccess()
      })
      .catch(err => {
        if(err.response.data.errors !== undefined){
          setAddResponseErrors(err.response.data.errors)
        }
        setAddResponseLoading(false)
      })
  }, [addTicketResponseItem, setAddResponseLoading, setAddResponseErrors])

  const changeStatus: ChangeStatusType = useCallback((ticketId, status) => {
    setChangeStatusLoading(true)
    request.put(`/api/ticket/${ticketId}`, {status})
      .then(response => {
        if(response.data !== undefined) {
          setTicketData(response.data)
        }
      })
      .catch(err => {})
      .then(() => setChangeStatusLoading(false))
  }, [setChangeStatusLoading, setTicketData])
  const functions = {
    login,
    logout,
    hasRole,
    setTicketListPage,
    setTicketListStatus,
    setTicketListLimit,
    takeTicket,
    setTicketPage,
    addResponse,
    changeStatus,
  }

  return <StoreContext.Provider value={{...state, ...functions }}>{children}</StoreContext.Provider>
}

export {StoreProvider, useStore}