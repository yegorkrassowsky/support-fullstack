import React from 'react'
import {Link} from 'react-router-dom'
import TicketList from '../components/TicketList'
import Loader from '../components/Loader'
import TicketListPagination from '../components/TicketListPagination'
import PageLimit from '../components/PageLimit'
import StatusFilter from '../components/StatusFilter'
import {userRoles} from '../constants'
import {useStore} from '../services/store'

const TicketListPage: React.FC = () => {
  const {hasRole, ticketList} = useStore()
  const {data: tickets, loading} = ticketList

  const listContainerClass = ['ticket-list-container']
  if(loading) {
    listContainerClass.push('loading')
  }
  return (
    <div className="ticket-list-page">
      <div className="ticket-list-header main-header">
        <h1>Tickets</h1>
        {hasRole(userRoles.client) && (
          <div className="d-flex justify-content-end">
            <Link className="btn btn-primary" to='/new-ticket'>New ticket</Link>
          </div>
      )}
        <div className="d-flex justify-content-between my-4">
          <StatusFilter />
          <PageLimit />
        </div>
      </div>
      <div className={listContainerClass.join(' ')}>
        <Loader />
        {tickets.length ? <TicketList tickets={tickets} /> : <div className="tickets-not-found">No tickets found</div> }
      </div>
      <TicketListPagination />
    </div>
  )
}

export default TicketListPage