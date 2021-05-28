import React from 'react'
import Ticket from './Ticket'
import {ITicket} from '../interfaces'
import {useStore} from '../services/store'
import {userRoles} from '../constants'

type TicketListProps = {
  tickets: ITicket[]
}

const TicketList: React.FC<TicketListProps> = ({tickets}) => {
  const {hasRole} = useStore()
  return (
    <table className="table table-tickets table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Subject</th>
      {hasRole(userRoles.agent) && (<th scope="col" className="client">Client</th>)}
      <th scope="col" className="agent">Agent</th>
      <th scope="col" className="status">Status</th>
      <th scope="col" className="replied-date">Replied at</th>
    </tr>
  </thead>
  <tbody>
    {tickets.map(ticket => <Ticket key={ticket.id} {...ticket} />)}
  </tbody>
</table>
  )
}

export default TicketList