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