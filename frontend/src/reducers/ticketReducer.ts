import {TicketActionTypes} from '../constants'
import {ITicketState, IFormState} from '../interfaces'
import {loadingReducer, errorsReducer} from './index'
import {TicketAction} from '../types'

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

const ticketReducer = (state: ITicketState = initialTicketState, action: TicketAction): ITicketState => {
  switch(action.type) {
    case TicketActionTypes.SET:
      return {...state, ...action.data}
    case TicketActionTypes.SET_TICKET:
      return {...state, data: action.data}
    case TicketActionTypes.SET_LOADING:
      return loadingReducer(state, action.loading)
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

const addResponse = (state: IFormState, action: TicketAction): IFormState => {
  switch(action.type) {
    case TicketActionTypes.SET_ADD_RESPONSE_LOADING:
      return loadingReducer(state, action.loading)
    case TicketActionTypes.SET_ADD_RESPONSE_ERRORS:
      return errorsReducer(state, action.errors)
    default:
      return state
  }
}

export default ticketReducer