import {ITicket} from '../interfaces'
import CONSTANTS, {ticketStatuses} from '../constants'

const Ticket: React.FC<ITicket> = ({id, title, agent, status, updated_at}) => {
  const ticketStatus = ticketStatuses[status] === undefined ? 1 : status
  const statusText = ticketStatuses[ticketStatus]
  const freeBadge = (<span className="badge bg-primary">{CONSTANTS.NOT_ASSIGNED_TICKET_STATUS}</span>)
  const ticketAgent = agent ? agent : freeBadge
  const replied = new Date(updated_at).toLocaleString()
  const badgeClasses = ['bg-danger', 'bg-warning', 'bg-success']
  const badgeClass = ['badge', ...[badgeClasses[ticketStatus]]].join(' ')
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{title}</td>
      <td>{ticketAgent}</td>
      <td><span className={badgeClass}>{statusText}</span></td>
      <td>{replied}</td>
    </tr>
  )
}

export default Ticket