import React from 'react'
import Pagination from '../components/Pagination'
import {useStore} from '../services/store'

const TicketListPagination: React.FC = () => {
  const {ticketList, setTicketListPage} = useStore()
  const paginationProps = {
    currentPage: ticketList.params.page,
    totalPages: ticketList.totalPages,
    onPageChanged: setTicketListPage,
    pageNeighbours: 1
  }
  return <Pagination {...paginationProps} />
}

export default TicketListPagination