import React from 'react'
import {connect} from 'react-redux'
import CONSTANTS, {ticketStatuses} from '../constants'
import { ThunkDispatchType } from '../types'
import {IStatus, IState, IAgent} from '../interfaces'

type TicketMetaProps = {
} & IStatus & IAgent

const TicketMeta: React.FC<TicketMetaProps> = ({status, agent}) => {
  const statusText = ticketStatuses[status]
  const statusClasses = ['bg-danger', 'bg-warning', 'bg-success']
  const cardClass = ['card', statusClasses[status]].join(' ')

  return (
    <div className="ticket-meta">
      <div className={cardClass}>
        <div className="card-body">
          <span className="ticket-status">{statusText}</span>
          <div className="ticket-agent">{agent ? agent : CONSTANTS.NOT_ASSIGNED_TICKET_STATUS}</div>
        </div>
      </div>
    </div>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({})

export default connect((state: IState) => ({
  status: state.ticket.data?.status || 0,
  agent: state.ticket.data?.agent || '',
}), mapDispatchToProps)(TicketMeta)
