import {
  AddTicketThunkType,
  ThunkDispatchType,
  LoadingActionCreatorType,
  ErrorsActionCreatorType,
} from '../types'
import {request} from '../services/store'
import {addTicketListItem} from './ticketList'
import {NewTicketActionTypes} from '../constants'

export const addTicket: AddTicketThunkType = (ticket, callback = (f: any) => f) => {
  return (dispatch: ThunkDispatchType) => {
    dispatch(setAddTicketLoading(true))
    let formData = new FormData()
    formData.append('subject', ticket.subject)
    formData.append('content', ticket.content)
    if(ticket.files){
      Array.from(ticket.files).forEach(file => formData.append('files[]', file))
    }
    
    request.post('/api/ticket', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
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