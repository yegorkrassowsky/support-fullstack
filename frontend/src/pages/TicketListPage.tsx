import React from 'react'
import { connect } from 'react-redux'
import TicketList from '../components/TicketList'
import Loader from '../components/Loader'
import TicketListPagination from '../components/TicketListPagination'
import PageLimit from '../components/PageLimit'
import StatusFilter from '../components/StatusFilter'
import TicketListHeader from '../components/TicketListHeader'
import {IState, ITicketListState} from '../interfaces'

type TicketListPageProps = {
  ticketList: ITicketListState
}

const TicketListPage: React.FC<TicketListPageProps> = ({ticketList}) => {
  const {data: tickets, loading, params} = ticketList
  const listContainerClass = ['ticket-list-container']
  if(loading) {
    listContainerClass.push('loading')
  }
  return (
    <div className="ticket-list-page">
      <div className="ticket-list-header main-header">
        <TicketListHeader />
        <div className="d-md-flex justify-content-between my-4">
          <PageLimit currentLimit={params.limit} />
          <StatusFilter currentStatus={params.status} />
        </div>
      </div>
      <div className={listContainerClass.join(' ')}>
        <Loader />
        {tickets.length ? <TicketList tickets={tickets} /> : <div className="tickets-not-found">No tickets found</div> }
      </div>
      <TicketListPagination page={params.page} totalPages={ticketList.totalPages} />
    </div>
  )
}

export default connect((state: IState) => ({
  ticketList: state.ticketList,
}))(TicketListPage)
