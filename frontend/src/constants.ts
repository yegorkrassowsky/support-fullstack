const CONSTANTS = {
  LEFT_PAGE: 'LEFT',
  RIGHT_PAGE: 'RIGHT',
  NOT_ASSIGNED_TICKET_STATUS: 'not assigned',
  INIT: 'INIT',
}

export default CONSTANTS

export const ticketStatuses = [
  'closed', 'pending', 'replied'
]

export const userRoles = {
  admin: 'admin',
  agent: 'agent',
  client: 'client',
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
}

export enum TicketListActionTypes {
  SET = 'TICKET_LIST_SET',
  SET_ITEM = 'TICKET_LIST_SET_ITEM',
  SET_ITEM_LOADING = 'TICKET_LIST_SET_ITEM_LOADING',
  SET_PAGE = 'TICKET_LIST_SET_PAGE',
  SET_STATUS = 'TICKET_LIST_SET_STATUS',
  SET_LIMIT = 'TICKET_LIST_SET_LIMIT',
  SET_LOADING = 'TICKET_LIST_SET_LOADING',
}

export enum TicketActionTypes {
  SET = 'TICKET_SET',
  SET_TICKET = 'TICKET_SET_TICKET',
  SET_LOADING = 'TICKET_SET_LOADING',
  SET_RESPONSES = 'TICKET_SET_RESPONSES',
  ADD_RESPONSE = 'TICKET_ADD_RESPONSE',
  SET_ADD_RESPONSE_LOADING = 'TICKET_SET_ADD_RESPONSE_LOADING',
  SET_ADD_RESPONSE_ERRORS = 'TICKET_SET_ADD_RESPONSE_ERRORS',
  SET_CHANGE_STATUS_LOADING = 'TICKET_SET_CHANGE_STATUS_LOADING',
}