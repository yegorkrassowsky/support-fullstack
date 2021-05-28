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
        {hasRole(userRoles.client) ?
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
          <PageLimit />
          <StatusFilter />
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