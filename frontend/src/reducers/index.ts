import {combineReducers} from 'redux'
import authReducer, {initialAuthState, authDefaults} from './authReducer'
import ticketListReducer, {initialTicketListState} from './ticketListReducer'
import ticketReducer, {initialTicketState} from './ticketReducer'
import newTicketReducer, {initialNewTicketState} from './newTicketReducer'
import {RootActionTypes} from '../constants'
import { ActionType, FormErrorsType } from "../types";
import {IState} from '../interfaces'

const initialState = {
  auth: initialAuthState,
  ticketList: initialTicketListState,
  ticket: initialTicketState,
  newTicket: initialNewTicketState,
}

const reducer = combineReducers({
  auth: authReducer,
  ticketList: ticketListReducer,
  ticket: ticketReducer,
  newTicket: newTicketReducer,
})

const rootReducer = (state: IState = initialState, action: ActionType) => {
  if(action.type === RootActionTypes.INIT) {
    return {...initialState, auth: authDefaults}
  }
  return reducer(state, action)
}

const loadingReducer = (state: any, loading: boolean) => ({...state, loading})
const errorsReducer = (state: any, errors: FormErrorsType) => ({...state, errors})

export { initialState, rootReducer, loadingReducer, errorsReducer }