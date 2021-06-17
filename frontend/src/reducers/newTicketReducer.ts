import {NewTicketActionTypes} from '../constants'
import {IFormState} from "../interfaces"
import {loadingReducer, errorsReducer} from './index'
import {NewTicketAction} from '../types'

export const initialNewTicketState = {
  loading: false,
  errors: null,
}

const newTicketReducer = (state: IFormState = initialNewTicketState, action: NewTicketAction): IFormState => {
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