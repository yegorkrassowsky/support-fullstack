const CONSTANTS = {
  LEFT_PAGE: 'LEFT',
  RIGHT_PAGE: 'RIGHT',
  NOT_ASSIGNED_TICKET_STATUS: 'not assigned',
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
  LOGOUT = 'LOGOUT',
}