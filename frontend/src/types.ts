import {
  IID,
  IErrors,
  ILoading,
  IFormErrors,
  ITicket,
  IResponses,
  ITicketWithResponse,
  ITicketWithResponses,
  IUserData,
  IUserName,
  IUserRoles,
  ILogin,
  IState,
  ITicketListParams,
  ITotalPages,
  ITicketList,
  IAddTicket,
  IResponse
} from './interfaces'
import {AuthActionTypes, TicketListActionTypes, NewTicketActionTypes, TicketActionTypes, RootActionTypes} from './constants'
import {ThunkDispatch} from 'redux-thunk'

export type FormErrorsType = IErrors | null
export type TicketListStatusType = number | null

// Actions

export type RootAction =
| {type: RootActionTypes.INIT}

export type AuthAction =
| {type: AuthActionTypes.LOGIN} & IUserName & IUserRoles
| {type: AuthActionTypes.SET_LOGIN_LOADING} & ILoading
| {type: AuthActionTypes.SET_LOGIN_ERRORS} & IFormErrors

export type TicketListAction =
| {type: TicketListActionTypes.SET, data: ITicket[], totalPages: number}
| {type: TicketListActionTypes.SET_ITEM, ticket: ITicket}
| {type: TicketListActionTypes.ADD_ITEM, ticket: ITicket}
| {type: TicketListActionTypes.SET_PAGE, page: number}
| {type: TicketListActionTypes.SET_LIMIT, limit: number}
| {type: TicketListActionTypes.SET_STATUS, status: number | null}
| {type: TicketListActionTypes.SET_LOADING, loading: boolean}
| {type: TicketListActionTypes.SET_ITEM_LOADING, id: number, loading: boolean}

export type NewTicketAction =
| {type: NewTicketActionTypes.SET_LOADING} & ILoading
| {type: NewTicketActionTypes.SET_ERRORS} & IFormErrors

export type TicketAction =
| {type: TicketActionTypes.SET, ticket: ITicketWithResponses}
| {type: TicketActionTypes.SET_TICKET, data: ITicket}
| {type: TicketActionTypes.SET_LOADING} & ILoading
| {type: TicketActionTypes.SET_RESPONSES} & IResponses
| {type: TicketActionTypes.ADD_RESPONSE, data: ITicketWithResponse}
| {type: TicketActionTypes.SET_ADD_RESPONSE_LOADING} & ILoading
| {type: TicketActionTypes.SET_ADD_RESPONSE_ERRORS} & IFormErrors
| {type: TicketActionTypes.SET_CHANGE_STATUS_LOADING} & ILoading

export type ActionType = RootAction | AuthAction | TicketListAction | TicketAction | NewTicketAction

// Action Creators

export type LoadingActionCreatorType = (loading: boolean) => ActionType
export type ErrorsActionCreatorType = (errors: FormErrorsType) => ActionType
export type LoginUserActionCreatorType = (userData: IUserData) => AuthAction

export type SetTicketListActionCreatorType = (tickets: ITicketList & ITotalPages) => TicketListAction
export type SetTicketListItemLoadingActionCreatorType = (data: IID & ILoading) => TicketListAction
export type SetTicketListItemActionCreatorType = (ticket: ITicket) => TicketListAction

export type SetTicketPageDataActionCreatorType = (ticket: ITicketWithResponses) => TicketAction
export type SetTicketActionCreatorType = (ticket: ITicket) => TicketAction
export type AddResponseItemActionCreatorType = (data: ITicketWithResponse) => TicketAction

// Thunks

export type ThunkDispatchType = ThunkDispatch<IState, void, ActionType>
export type GetStateType = () => IState
export type DispatchCallbackType = (dispatch: ThunkDispatchType, getState: GetStateType) => void
export type LoginThunkType = (credentials: ILogin) => DispatchCallbackType
export type LogoutThunkType = () => DispatchCallbackType
export type SetTicketListPageThunkType = (page: number) => DispatchCallbackType
export type SetTicketListStatusThunkType = (status: TicketListStatusType) => DispatchCallbackType
export type SetTicketListLimitThunkType = (limit: number) => DispatchCallbackType
export type GetTicketsThunkType = () => DispatchCallbackType
export type TakeTicketThunkType = (id: number) => DispatchCallbackType
export type AddTicketThunkType = (ticket: IAddTicket, callback: Function) => DispatchCallbackType
export type SetTicketPageThunkType = (ticketId: number, page: number) => DispatchCallbackType
export type ChangeStatusThunkType = (ticketId: number, status: number) => DispatchCallbackType
export type AddResponseThunkType = (ticketId: number, content: string, callback: Function) => DispatchCallbackType

// Functions Dispatched To Props

export type SetErrorsType = (errors: FormErrorsType) => void

export type OnLoginType = (credentials: ILogin) => void
export type SetTicketListPageType = (page: number) => void
export type SetTicketListLimitType = (limit: number) => void
export type SetTicketListStatusType = (status: number | null) => void
export type GetTicketsType = () => void
export type TakeTicketType = (id: number) => void
export type AddTicketType = (ticket: IAddTicket, callback: Function) => void
export type SetTicketPageType = (ticketId: number, page: number) => void
export type ChangeStatusType = (ticketId: number, status: number) => void
export type AddResponseType = (ticketId: number, content: string, callback: Function) => void
