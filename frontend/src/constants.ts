const CONSTANTS = {
  LEFT_PAGE: 'LEFT',
  RIGHT_PAGE: 'RIGHT',
  NOT_ASSIGNED_TICKET_STATUS: 'not assigned',
}

export default CONSTANTS

export const ticketStatuses = [
  'closed', 'pending', 'replied'
]

export const roles = {
  admin: 'admin',
  agent: 'agent',
  client: 'client',
}

export enum RootActionTypes {
  INIT = 'INIT'
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  SET_LOGIN_LOADING = 'AUTH_SET_LOGIN_LOADING',
  SET_LOGIN_ERRORS = 'AUTH_SET_LOGIN_ERRORS',
}

export enum TicketListActionTypes {
  SET = 'TICKET_LIST_SET',
  SET_ITEM = 'TICKET_LIST_SET_ITEM',
  ADD_ITEM = 'TICKET_LIST_ADD_ITEM',
  SET_ITEM_LOADING = 'TICKET_LIST_SET_ITEM_LOADING',
  SET_PAGE = 'TICKET_LIST_SET_PAGE',
  SET_STATUS = 'TICKET_LIST_SET_STATUS',
  SET_LIMIT = 'TICKET_LIST_SET_LIMIT',
  SET_LOADING = 'TICKET_LIST_SET_LOADING',
}

export enum TicketActionTypes {
  SET_TICKET = 'TICKET_SET_TICKET',
  SET_LOADING = 'TICKET_SET_LOADING',
  SET_RESPONSES = 'TICKET_SET_RESPONSES',
  SET_TOTAL_PAGES = 'TICKET_SET_TOTAL_PAGES',
  ADD_RESPONSE = 'TICKET_ADD_RESPONSE',
  SET_ADD_RESPONSE_LOADING = 'TICKET_SET_ADD_RESPONSE_LOADING',
  SET_ADD_RESPONSE_ERRORS = 'TICKET_SET_ADD_RESPONSE_ERRORS',
  SET_CHANGE_STATUS_LOADING = 'TICKET_SET_CHANGE_STATUS_LOADING',
}

export enum NewTicketActionTypes {
  SET_LOADING = 'NEW_TICKET_SET_LOADING',
  SET_ERRORS = 'NEW_TICKET_SET_ERRORS'
}

export enum GuestClientCredentials {
  EMAIL = 'qweg@mail.ru',
  PASS = '123',
}

export enum GuestAgentCredentials {
  EMAIL = 'ykdevreact@gmail.com',
  PASS = '123',
}