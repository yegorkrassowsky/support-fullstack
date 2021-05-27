import React, {createContext, useContext, useReducer, useCallback, useEffect} from 'react';
import {reducer, initialState} from '../reducers/index'
import CONSTANTS, {AuthActionTypes, TicketListActionTypes, TicketActionTypes, NewTicketActionTypes} from '../constants'
import {IAuthState, ILogin, IFormState, ITicket, ITicketListState, ITicketState, ITicketWithResponse, ITicketWithResponses} from '../interfaces'
import {FormErrorsType} from '../types'
import useFunctions from '../functions'
import axios from 'axios'

type DispatchLoadingType = (loading: boolean) => void
type DispatchErrorsType = (errors: FormErrorsType) => void
type LoginType = (params: ILogin) => void
type LogoutType = () => void
type AuthLoginType = (userRoles: string[], userName: string) => void
type AuthLogoutType = () => void
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
type AddTicketType = (subject: string, content: string) => void
type ContextType = {
  auth: IAuthState
  ticketList: ITicketListState
  ticket: ITicketState
  newTicket: IFormState
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
  addTicket: AddTicketType
  setAddTicketErrors: DispatchErrorsType
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
  changeStatus: () => {},
  addTicket: () => {},
  setAddTicketErrors: () => {},
}

const StoreContext = createContext<ContextType>(initialStoreValues)

const useStore = () => {
  return useContext(StoreContext)
}

const request = axios.create({
  baseURL: 'http://localhost/api',
  withCredentials: true,
})

const StoreProvider: React.FC = ( { children } ) => {
  const {gotoTicket} = useFunctions()
  const [state, dispatch] = useReducer(reducer, initialState)
  const {params: ticketListParams} = state.ticketList
  const {loggedIn, userRoles} = state.auth  

  const authLogin: AuthLoginType = (userRoles, userName) => {
    dispatch({
      type: AuthActionTypes.LOGIN,
      userRoles,
      userName
    })
    sessionStorage.setItem('loggedIn', 'true')
    sessionStorage.setItem('userRoles', JSON.stringify(userRoles))
    sessionStorage.setItem('userName', userName)
  }

  const authLogout: AuthLogoutType = () => {
    dispatch({type: CONSTANTS.INIT})
    sessionStorage.removeItem('loggedIn')
    sessionStorage.removeItem('userRoles')
    sessionStorage.removeItem('userName')
  }

  const setLoginLoading: DispatchLoadingType = loading => {
    dispatch({type: AuthActionTypes.SET_LOGIN_LOADING, loading})
  }

  const setLoginErrors: DispatchErrorsType = errors => {
    dispatch({type: AuthActionTypes.SET_LOGIN_ERRORS, errors})
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

  const addTicketListItem: SetTicketListItemType = useCallback((ticket) => {
    dispatch({type: TicketListActionTypes.ADD_ITEM, ticket})
  }, [])

  const setAddResponseLoading: DispatchLoadingType = useCallback(loading => {
    dispatch({type: TicketActionTypes.SET_ADD_RESPONSE_LOADING, loading})
  }, [])

  const setAddResponseErrors: DispatchErrorsType = useCallback((errors) => {
    dispatch({type: TicketActionTypes.SET_ADD_RESPONSE_ERRORS, errors})
  }, [])

  const setAddTicketErrors: DispatchErrorsType = useCallback((errors) => {
    dispatch({type: NewTicketActionTypes.SET_ERRORS, errors})
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

  const setAddTicketLoading: DispatchLoadingType = useCallback(loading => {
    dispatch({type: NewTicketActionTypes.SET_LOADING, loading})
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

  const addTicket: AddTicketType = useCallback((subject, content) => {
    setAddTicketLoading(true)
    request.post('/api/ticket', {subject, content})
      .then(response => {
        if(response.data !== undefined) {
          addTicketListItem(response.data)
          gotoTicket(response.data.id)
        }
        setAddTicketErrors(null)
      })
      .catch(err => {
        if(err.response.data.errors !== undefined){
          setAddTicketErrors(err.response.data.errors)
        }
      }).then(() => {
        setAddTicketLoading(false)
      })
  }, [gotoTicket, setAddTicketErrors, setAddTicketLoading, addTicketListItem])

  const login: LoginType = params => {
    setLoginLoading(true)
    request.get('/sanctum/csrf-cookie')
      .then(response => {
        request.post('/login', params)
          .then(response => {
            if(response.status === 200 && response.data !== undefined) {
              const {userRoles, userName} = response.data
              authLogin(userRoles, userName)
            }
          })
          .catch(err => {
            if(err.response !== undefined && err.response.status === 422 && err.response.data.errors !== undefined){
              setLoginErrors(err.response.data.errors)
            }
          })
          .then(() => {
            setLoginLoading(false)
          })
      })
      .catch(() => setLoginLoading(false) )
  }

  const logout: LogoutType = () => {
    request.post('/logout')
      .then(response => {
        if(response.status === 204){
          authLogout()
        }
      })
  }

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
    addTicket,
    setAddTicketErrors,
  }

  return <StoreContext.Provider value={{...state, ...functions }}>{children}</StoreContext.Provider>
}

export {StoreProvider, useStore}