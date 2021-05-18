import authReducer, {initialAuthState} from './authReducer'

const initialState = {
  auth: initialAuthState
}

function combineReducers(reducers: {[key: string]: Function}) {  
  return (state: any = {}, action: any) => {
    const newState: any = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  }
}

const reducer = combineReducers({
  auth: authReducer
})

export { initialState, reducer }