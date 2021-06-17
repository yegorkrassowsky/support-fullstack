import {TicketActionTypes} from '../constants'
import {
  ErrorsActionCreatorType,
  LoadingActionCreatorType,
  SetTicketPageDataActionCreatorType,
  SetTicketPageThunkType,
  ChangeStatusThunkType,
  SetTicketActionCreatorType,
  AddResponseThunkType,
  AddResponseItemActionCreatorType,
  ThunkDispatchType
} from '../types'
import {request} from '../services/store'
import {setTicketListItem} from './ticketList'

const setTicketLoading: LoadingActionCreatorType = loading => ({type: TicketActionTypes.SET_LOADING, loading})
const setChangeStatusLoading: LoadingActionCreatorType = loading => ({type: TicketActionTypes.SET_CHANGE_STATUS_LOADING, loading})
const setTicketPageData: SetTicketPageDataActionCreatorType = ticket => ({type: TicketActionTypes.SET, ticket})
const setTicket: SetTicketActionCreatorType = data => ({type: TicketActionTypes.SET_TICKET, data})
const addResponseItem: AddResponseItemActionCreatorType = data => ({type: TicketActionTypes.ADD_RESPONSE, data})
const setAddResponseLoading: LoadingActionCreatorType = loading => ({type: TicketActionTypes.SET_ADD_RESPONSE_LOADING, loading})
export const setAddResponseErrors: ErrorsActionCreatorType = errors => ({type: TicketActionTypes.SET_ADD_RESPONSE_ERRORS, errors})

export const setTicketPage: SetTicketPageThunkType = (ticketId, page) => {
  return (dispatch: ThunkDispatchType) => {
    dispatch(setTicketLoading(true))
    request.get(`/api/ticket/${ticketId}`, {params: {page}})
      .then(response => {
        if(response.data !== undefined) {
          dispatch(setTicketPageData({
            data: response.data.ticket,
            responses: response.data.responses.data,
            totalPages: response.data.responses.last_page
          }))
        }
      })
      .catch(err => {})
      .then(() => {
        dispatch(setTicketLoading(false))
      })
  }
}

export const changeStatus: ChangeStatusThunkType = (ticketId, status) => {
  return (dispatch: ThunkDispatchType) => {
    dispatch(setChangeStatusLoading(true))
    request.put(`/api/ticket/${ticketId}`, {status})
      .then(response => {
        if(response.data !== undefined) {
          dispatch(setTicket(response.data))
          dispatch(setTicketListItem(response.data))
        }
      })
      .catch(err => {})
      .then(() => dispatch(setChangeStatusLoading(false)))
  }
}

export const addResponse: AddResponseThunkType = (ticketId, content, callback = (f: any) => f) => {
  return (dispatch: ThunkDispatchType) => {
    dispatch(setAddResponseLoading(true))
    request.post('/api/response', {ticket_id: ticketId, content})
      .then(response => {
        if(response.data !== undefined) {
          dispatch(addResponseItem(response.data))
          dispatch(setTicketListItem(response.data))
        }
        dispatch(setAddResponseErrors(null))
        callback()
      })
      .catch(err => {
        if(err.response.data.errors !== undefined){
          dispatch(setAddResponseErrors(err.response.data.errors))
        }
        
      })
      .then(() => dispatch(setAddResponseLoading(false)))
  }
}
