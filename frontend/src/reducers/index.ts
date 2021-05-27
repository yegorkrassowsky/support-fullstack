import authReducer, {initialAuthState, authDefaults} from './authReducer'
import ticketListReducer, {initialTicketListState} from './ticketListReducer'
import ticketReducer, {initialTicketState} from './ticketReducer'
import newTicketReducer, {initialNewTicketState} from './newTicketReducer'
import CONSTANTS from '../constants'
import { FormErrorsType } from "../types";

const initialState = {
  auth: initialAuthState,
  ticketList: initialTicketListState,
  ticket: initialTicketState,
  newTicket: initialNewTicketState,
}

function combineReducers(reducers: {[key: string]: Function}) {  
  return (state: any = {}, action: any) => {
    if(action.type === CONSTANTS.INIT) {
      return {...initialState, auth: authDefaults}
    }
    const newState: any = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  }
}

const reducer = combineReducers({
  auth: authReducer,
  ticketList: ticketListReducer,
  ticket: ticketReducer,
  newTicket: newTicketReducer,
})

const loadingReducer = (state: any, loading: boolean) => ({...state, loading})
const errorsReducer = (state: any, errors: FormErrorsType) => ({...state, errors})

export { initialState, reducer, loadingReducer, errorsReducer }