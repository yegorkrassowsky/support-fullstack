import { FormErrorsType } from "./types"

export interface ILoading {
  loading: boolean
}

export interface ITicket {
  id: number
  subject: string
  content: string
  status: number
  agent: string
  author: string
  created_at: string
  updated_at: string
}

export interface ITicketItemState extends ITicket {
  loading?: boolean
}

export interface IResponse {
  id: number
  content: string
  author: string
  created_at: string
  updated_at: string
  author_pos: string
  showDate?: boolean
  loading?: boolean
}

export interface IResponses {
  responses: IResponse[],
}

export interface IPagination {
  totalPages: number
  currentPage: number
  onPageChanged: (page: number) => void
  pageNeighbours?: number
}

export interface IFormErrors {
  errors: FormErrorsType
}

export interface IFormState extends ILoading, IFormErrors {}

export interface IAuthState {
  loggedIn: boolean
  userName: string
  userRoles: string[]
  login: IFormState
}

export interface ITicketListState extends ILoading {
  data: ITicket[]
  totalPages: number
  params: ITicketListParams
}

export interface ITicketListParams {
  page: number
  limit: number
  status: number | null
}

export interface IErrors {
  [key: string]: string[]
}

export interface ITicketWithResponse {
  ticket: ITicket
  response: IResponse
}

export interface ITicketWithResponses extends IResponses {
  data: ITicket | null
  totalPages: number
}
export interface ITicketState extends ITicketWithResponses, ILoading, IResponses {
  addResponse: IFormState
  changeStatusLoading: boolean
}

export interface ILogin {
  email: string,
  password: string,
}

