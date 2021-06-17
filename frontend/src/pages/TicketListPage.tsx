import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import TicketList from '../components/TicketList'
import Loader from '../components/Loader'
import TicketListPagination from '../components/TicketListPagination'
import PageLimit from '../components/PageLimit'
import StatusFilter from '../components/StatusFilter'
import {roles} from '../constants'
import {IState, ITicketListState, IUserRoles} from '../interfaces'
import {GetTicketsType ,ThunkDispatchType} from '../types'
import {getTickets} from '../actions/ticketList'

type TicketListPageProps = {
  ticketList: ITicketListState
  getTickets: GetTicketsType
} & IUserRoles

const TicketListPage: React.FC<TicketListPageProps> = ({ticketList, userRoles, getTickets}) => {
  const {data: tickets, loading, params} = ticketList
  const listContainerClass = ['ticket-list-container']
  if(loading) {
    listContainerClass.push('loading')
  }
  return (
    <div className="ticket-list-page">
      <div className="ticket-list-header main-header">
        {userRoles.includes(roles.client) ?
          <>
            <h1>Your tickets</h1>
            <div className="d-flex justify-content-end">
              <Link className="btn btn-primary" to='/new-ticket'>New ticket</Link>
            </div>
          </>
          :
          <h1>Tickets</h1>
        }
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

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  getTickets: () => dispatch(getTickets())
})

export default connect((state: IState) => ({
  ticketList: state.ticketList,
  userRoles: state.auth.userRoles,
}), mapDispatchToProps)(TicketListPage)
