import React from 'react'
import {connect} from 'react-redux'
import Pagination from '../components/Pagination'
import {SetTicketListPageType, ThunkDispatchType} from '../types'
import {setTicketListPage} from '../actions/ticketList'
import { IState } from '../interfaces'

type TicketListPaginationProps = {
  page: number,
  totalPages: number,
  setTicketListPage: SetTicketListPageType
}

const TicketListPagination: React.FC<TicketListPaginationProps> = ({page, totalPages, setTicketListPage}) => {
  const paginationProps = {
    currentPage: page,
    totalPages: totalPages,
    onPageChanged: setTicketListPage,
    pageNeighbours: 1
  }
  return <Pagination {...paginationProps} />
}

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
    setTicketListPage: (page: number) => dispatch(setTicketListPage(page))
})

export default connect((state: IState) => ({
  page: state.ticketList.params.page,
  totalPages: state.ticketList.totalPages,
}), mapDispatchToProps)(TicketListPagination)