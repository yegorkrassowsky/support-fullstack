import {
  GetTicketsThunkType,
  LoadingActionCreatorType,
  ThunkDispatchType,
  SetTicketListActionCreatorType,
  TakeTicketThunkType,
  SetTicketListItemLoadingActionCreatorType,
  SetTicketListItemActionCreatorType,
  GetStateType,
  SetTicketListPageThunkType,
  SetTicketListStatusThunkType,
  SetTicketListLimitThunkType
} from '../types'
import {TicketListActionTypes} from '../constants'
import {request} from '../services/store'

export const setTicketListStatus: SetTicketListStatusThunkType = (status) => {
  return (dispatch: ThunkDispatchType) => {
    dispatch({type: TicketListActionTypes.SET_STATUS, status})
    return dispatch(setTicketListPage(1))
  }
}

export const setTicketListLimit: SetTicketListLimitThunkType = (limit) => {
  return (dispatch: ThunkDispatchType) => {
    dispatch({type: TicketListActionTypes.SET_LIMIT, limit})
    return dispatch(setTicketListPage(1))
  }
}

export const setTicketListPage: SetTicketListPageThunkType = (page) => {
  return (dispatch: ThunkDispatchType) => {
    dispatch({type: TicketListActionTypes.SET_PAGE, page})
    return dispatch(getTickets())
  }
}

export const getTickets: GetTicketsThunkType = () => {
  return (dispatch: ThunkDispatchType, getState: GetStateType) => {
    dispatch(setTicketListLoading(true))
    const params = getState().ticketList.params
    request.get('/api/ticket', {params})
      .then(response => {
        if(response.data !== undefined) {
          dispatch(setTicketList({data: response.data.data, totalPages: response.data.last_page}))
        }
      })
      .catch(err => {})
      .then(() => dispatch(setTicketListLoading(false)))
  }
}

export const takeTicket: TakeTicketThunkType = id => {
  return (dispatch: ThunkDispatchType) => {
    dispatch(setTicketListItemLoading({id, loading: true}))
    request.put(`/api/ticket/${id}`, {status: 1})
      .then(response => {
        if(response.data !== undefined) {
          dispatch(setTicketListItem(response.data))
        }
      })
      .catch(err => {})
  }
}

const setTicketListLoading: LoadingActionCreatorType = (loading) => ({type: TicketListActionTypes.SET_LOADING, loading})

const setTicketList: SetTicketListActionCreatorType = ({data, totalPages}) => ({type: TicketListActionTypes.SET, data, totalPages})

const setTicketListItemLoading: SetTicketListItemLoadingActionCreatorType = ({id, loading}) => ({type: TicketListActionTypes.SET_ITEM_LOADING, id, loading})

export const setTicketListItem: SetTicketListItemActionCreatorType = (ticket) => ({type: TicketListActionTypes.SET_ITEM, ticket})

export const addTicketListItem: SetTicketListItemActionCreatorType = (ticket) => ({type: TicketListActionTypes.ADD_ITEM, ticket})

