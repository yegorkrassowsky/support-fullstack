import {ITicketListState, ITicket} from '../interfaces'
import {TicketListActionTypes} from '../constants'

type TicketListAction =
| {type: TicketListActionTypes.SET} & ITicketListState
| {type: TicketListActionTypes.UPDATE_TICKET, ticket: ITicket}

export const initialTicketListState = {
  data: [],
  totalPages: 1,
}

const ticketListReducer = (state: ITicketListState, action: TicketListAction): ITicketListState => {  
  switch(action.type) {
    case TicketListActionTypes.SET:
      return {data: action.data, totalPages: action.totalPages}
    case TicketListActionTypes.UPDATE_TICKET:
      const data = state.data.map((ticket: ITicket) => {
        return ticket.id === action.ticket.id ? action.ticket : ticket
      })
      return {...state, data}
    default:
      return state
  }
}

export default ticketListReducer