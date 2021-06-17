import {
  AddTicketThunkType,
  ThunkDispatchType,
  LoadingActionCreatorType,
  ErrorsActionCreatorType
} from '../types'
import {request} from '../services/store'
import {addTicketListItem} from './ticketList'
import {NewTicketActionTypes} from '../constants'

export const addTicket: AddTicketThunkType = (ticket, callback = (f: any) => f) => {
  return (dispatch: ThunkDispatchType) => {
    dispatch(setAddTicketLoading(true))
    request.post('/api/ticket', ticket)
      .then(response => {
        if(response.data !== undefined) {
          dispatch(addTicketListItem(response.data))
          callback(response.data.id)
        }
        dispatch(setAddTicketErrors(null))
      })
      .catch(err => {
        if(err.response.data.errors !== undefined){
          dispatch(setAddTicketErrors(err.response.data.errors))
        }
      }).then(() => {
        dispatch(setAddTicketLoading(false))
      })
  }
}

const setAddTicketLoading: LoadingActionCreatorType = loading => ({type: NewTicketActionTypes.SET_LOADING, loading})
export const setAddTicketErrors: ErrorsActionCreatorType = errors => ({type: NewTicketActionTypes.SET_ERRORS, errors})