import {NewTicketActionTypes} from '../constants'
import { IFormState, ILoading, IFormErrors } from "../interfaces"
import {loadingReducer, errorsReducer} from './index'

type NewTicketAction =
| {type: NewTicketActionTypes.SET_LOADING} & ILoading
| {type: NewTicketActionTypes.SET_ERRORS} & IFormErrors

export const initialNewTicketState = {
  loading: false,
  errors: null,
}

const newTicketReducer = (state: IFormState, action: NewTicketAction): IFormState => {
  switch(action.type) {
    case NewTicketActionTypes.SET_LOADING:
      return loadingReducer(state, action.loading)
    case NewTicketActionTypes.SET_ERRORS:
      return errorsReducer(state, action.errors)
    default:
      return state
  }
}

export default newTicketReducer