import {ITicketListState, ITicket} from '../interfaces'
import {TicketListActionTypes} from '../constants'

export type TicketListAction =
| {type: TicketListActionTypes.SET, data: ITicket[], totalPages: number}
| {type: TicketListActionTypes.UPDATE_TICKET, ticket: ITicket}
| {type: TicketListActionTypes.SET_PAGE, page: number}
| {type: TicketListActionTypes.SET_LIMIT, limit: number}
| {type: TicketListActionTypes.SET_STATUS, status: number | null}
| {type: TicketListActionTypes.SET_LOADING, loading: boolean}

const defaultParams = {
  page: 1,
  limit: 10,
  status: null
}

export const initialTicketListState = {
  data: [],
  totalPages: 1,
  loading: false,
  params: defaultParams
}

const ticketListReducer = (state: ITicketListState, action: TicketListAction): ITicketListState => {  
  switch(action.type) {
    case TicketListActionTypes.SET:
      return {...state, data: action.data, totalPages: action.totalPages}
    case TicketListActionTypes.UPDATE_TICKET:
      const data = state.data.map((ticket: ITicket) => {
        return ticket.id === action.ticket.id ? action.ticket : ticket
      })
      return {...state, data}
    case TicketListActionTypes.SET_PAGE:
      return {...state, params: {...state.params, page: action.page}}
    case TicketListActionTypes.SET_STATUS:
      const status = action.status === state.params.status ? null : action.status
      return {...state, params: {...state.params, status, page: 1}}
    case TicketListActionTypes.SET_LIMIT:
      return {...state, params: {...state.params, limit: action.limit, page: 1}}
    case TicketListActionTypes.SET_LOADING:
      return {...state, loading: action.loading}
    default:
      return state
  }
}

export default ticketListReducer