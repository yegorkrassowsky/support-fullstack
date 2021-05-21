import authReducer, {initialAuthState} from './authReducer'
import ticketListReducer, {initialTicketListState} from './ticketListReducer'
import CONSTANTS from '../constants'

const initialState = {
  auth: initialAuthState,
  ticketList: initialTicketListState
}

function combineReducers(reducers: {[key: string]: Function}) {  
  return (state: any = {}, action: any) => {
    if(action.type === CONSTANTS.INIT) {
      return initialState
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
  ticketList: ticketListReducer
})

export { initialState, reducer }