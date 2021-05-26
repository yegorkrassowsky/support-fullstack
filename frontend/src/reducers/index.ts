import authReducer, {initialAuthState, authDefaults} from './authReducer'
import ticketListReducer, {initialTicketListState} from './ticketListReducer'
import ticketReducer, {initialTicketState} from './ticketReducer'
import CONSTANTS from '../constants'

const initialState = {
  auth: initialAuthState,
  ticketList: initialTicketListState,
  ticket: initialTicketState,
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
})

export { initialState, reducer }