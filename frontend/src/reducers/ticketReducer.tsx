import {TicketActionTypes} from '../constants'
import {ITicketState, ITicket, IResponse, IAddResponseState, ITicketWithResponses, ITicketWithResponse} from '../interfaces'
import {FormErrorsType} from '../types'

export type TicketAction =
| {type: TicketActionTypes.SET, ticket: ITicketWithResponses}
| {type: TicketActionTypes.SET_TICKET, data: ITicket}
| {type: TicketActionTypes.SET_LOADING, loading: boolean}
| {type: TicketActionTypes.SET_RESPONSES, responses: IResponse[]}
| {type: TicketActionTypes.ADD_RESPONSE, data: ITicketWithResponse}
| {type: TicketActionTypes.SET_ADD_RESPONSE_LOADING, loading: boolean}
| {type: TicketActionTypes.SET_ADD_RESPONSE_ERRORS, errors: FormErrorsType}
| {type: TicketActionTypes.SET_CHANGE_STATUS_LOADING, loading: boolean}

const initialAddResponseState = {
  loading: false,
  errors: null,
}
export const initialTicketState = {
  loading: false,
  changeStatusLoading: false,
  data: null,
  responses: [],
  totalPages: 1,
  addResponse: initialAddResponseState,
}

const ticketReducer = (state: ITicketState, action: TicketAction): ITicketState => {
  switch(action.type) {
    case TicketActionTypes.SET:
      return {...state, ...action.ticket}
    case TicketActionTypes.SET_TICKET:
      return {...state, data: action.data}
    case TicketActionTypes.SET_LOADING:
      return {...state, loading: action.loading}
    case TicketActionTypes.SET_CHANGE_STATUS_LOADING:
      return {...state, changeStatusLoading: action.loading}
    case TicketActionTypes.SET_RESPONSES:
      return {...state, responses: action.responses}
    case TicketActionTypes.ADD_RESPONSE:
      return {...state, data: action.data.ticket, responses: [...state.responses, action.data.response]}
    case TicketActionTypes.SET_ADD_RESPONSE_LOADING:
      return {...state, addResponse: addResponse(state.addResponse, action)}
    case TicketActionTypes.SET_ADD_RESPONSE_ERRORS:
      return {...state, addResponse: addResponse(state.addResponse, action)}
      default:
      return state
  }
}

const addResponse = (state: IAddResponseState, action: TicketAction): IAddResponseState => {
  switch(action.type) {
    case TicketActionTypes.SET_ADD_RESPONSE_LOADING:
      return {...state, loading: action.loading}
    case TicketActionTypes.SET_ADD_RESPONSE_ERRORS:
      return {...state, errors: action.errors}
    default:
      return state
  }
}

export default ticketReducer