import React from 'react'
import {connect} from 'react-redux'
import Ticket from './Ticket'
import {IState, ITicket, IUserRoles} from '../interfaces'
import {roles} from '../constants'

type TicketListProps = {
  tickets: ITicket[],
} & IUserRoles

const TicketList: React.FC<TicketListProps> = ({tickets, userRoles}) => {
  return (
    <table className="table table-tickets table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Subject</th>
          {userRoles.includes(roles.agent) && (<th scope="col" className="client">Client</th>)}
          <th scope="col" className="agent">Agent</th>
          <th scope="col" className="status">Status</th>
          <th scope="col" className="replied-date">Replied at</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(ticket => <Ticket key={ticket.id} ticket={ticket} />)}
      </tbody>
    </table>
  )
}

export default connect((state: IState) => ({
  userRoles: state.auth.userRoles,
}))(TicketList)
