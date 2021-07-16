import {ITicketListState, ITicket, ITicketItemState} from '../interfaces'
import {TicketListActionTypes} from '../constants'
import {loadingReducer} from './index'
import {TicketListAction} from '../types'

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

const ticket = (state: ITicketItemState, action: TicketListAction): ITicket => {
  switch(action.type) {
    case TicketListActionTypes.SET_ITEM:
      return state.id === action.data.id ? action.data : state
    case TicketListActionTypes.SET_ITEM_LOADING:
      return state.id === action.id ? loadingReducer(state, action.loading) : state
    default:
      return state
  }

}

const ticketListReducer = (state: ITicketListState = initialTicketListState, action: TicketListAction): ITicketListState => {
  switch(action.type) {
    case TicketListActionTypes.SET:
      return {...state, data: action.data, totalPages: action.totalPages}
    case TicketListActionTypes.ADD_ITEM:
      return {...state, data: [action.data, ...state.data]}
      case TicketListActionTypes.SET_ITEM:
      return {...state, data: state.data.map((t: ITicketItemState) => ticket(t, action))}
    case TicketListActionTypes.SET_ITEM_LOADING:
      return {...state, data: state.data.map((t: ITicketItemState) => ticket(t, action))}
    case TicketListActionTypes.SET_PAGE:
      return {...state, params: {...state.params, page: action.page}}
    case TicketListActionTypes.SET_STATUS:
      const status = action.status === state.params.status ? null : action.status
      return {...state, params: {...state.params, status}}
    case TicketListActionTypes.SET_LIMIT:
      return {...state, params: {...state.params, limit: action.limit}}
    case TicketListActionTypes.SET_LOADING:
      return loadingReducer(state, action.loading)
    default:
      return state
  }
}

export default ticketListReducer