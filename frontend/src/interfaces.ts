import { FormErrorsType, FilesInputType } from "./types"

export interface IID {
  id: number
}

export interface ILoading {
  loading: boolean
}

export interface ITotalPages {
  totalPages: number
}

export interface ISubject {
  subject: string
}

export interface IContent {
  content: string
}

export interface IFiles {
  files: FilesInputType
}

export interface IAuthor {
  author: string
}

export interface ICreatedAt {
  created_at: string
}

export interface IUpdatedAt {
  updated_at: string
}

export interface IStatus {
  status: number
}

export interface IAddTicket extends ISubject, IContent, IFiles {}
export interface IAddResponse extends IContent, IFiles {}

export interface IAgent {
  agent: string
}

export interface IAttachments {
  attachments: string
}

export interface ITicket extends IID, ISubject, IContent, IAuthor, ICreatedAt, IUpdatedAt, IStatus, IAgent, IAttachments {}

export interface ITicketItemState extends ITicket, Partial<ILoading> {}

export interface IResponse extends IID, IContent, IAuthor, ICreatedAt, IUpdatedAt, Partial<ILoading> {
  author_pos: string
  showDate?: boolean
  attachments: string | null
}

export interface IResponses {
  responses: IResponse[],
}

export interface IPagination extends ITotalPages {
  currentPage: number
  onPageChanged: (page: number) => void
  pageNeighbours?: number
}

export interface IFormErrors {
  errors: FormErrorsType
}

export interface IFormState extends ILoading, IFormErrors {}

export interface ILoggedIn {
  loggedIn: boolean
}
export interface IAuthState extends ILoggedIn, IUserName, IUserRoles {
  login: ILoading
}

export interface ITicketList {
  data: ITicket[]
}

export interface ITicketListState extends ITicketList, ILoading, ITotalPages {
  params: ITicketListParams
}

export interface IPage {
  page: number
}

export interface ILimit {
  limit: number
}

export interface IStatusOrNull {
  status: number | null
}

export interface ITicketListParams extends IPage, ILimit, IStatusOrNull {}

export interface IErrors {
  [key: string]: string[]
}

export interface ITicketWithResponse {
  ticket: ITicket
  response: IResponse
}

export interface ITicketWithResponses extends IResponses, ITotalPages {
  data: ITicket | null
}

export interface ITicketState extends ITicketWithResponses, ILoading, IResponses {
  addResponse: IFormState
  changeStatusLoading: boolean
}

export interface ILogin {
  email: string,
  password: string,
}

export interface IState {
  auth: IAuthState
  ticketList: ITicketListState
  ticket: ITicketState
  newTicket: IFormState
}

export interface IUserName {
  userName: string
}

export interface IUserRoles {
  userRoles: string[]
}

export interface IUserData extends IUserName, IUserRoles {}