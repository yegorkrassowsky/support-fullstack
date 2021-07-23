import React from 'react'
import TicketListPagination from '../components/TicketListPagination'
import PageLimit from '../components/PageLimit'
import StatusFilter from '../components/StatusFilter'
import TicketListHeader from '../components/TicketListHeader'
import TicketListBody from '../components/TicketListBody'

type TicketListPageProps = {}

const TicketListPage: React.FC<TicketListPageProps> = () => {
  return (
    <div className="ticket-list-page">
      <div className="ticket-list-header main-header">
        <TicketListHeader />
        <div className="d-md-flex justify-content-between my-4">
          <PageLimit />
          <StatusFilter />
        </div>
      </div>
      <TicketListBody />
      <TicketListPagination />
    </div>
  )
}

export default TicketListPage