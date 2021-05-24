
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

export interface IPagination {
  totalPages: number
  currentPage: number
  onPageChanged: (page: number) => void
  pageNeighbours?: number
}

export interface IAuthState {
  loggedIn: boolean
  userName: string
  userRoles: string[]
}

export interface ITicketListState {
  data: ITicket[]
  totalPages: number
  loading: boolean
  params: ITicketListParams
}

export interface ITicketListParams {
  page: number
  limit: number
  status: number | null
}