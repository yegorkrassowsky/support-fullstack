import {ITicketItemState} from '../interfaces'
import CONSTANTS, {ticketStatuses, userRoles} from '../constants'
import {useStore} from '../services/store'
import useFunctions from '../functions'

const Ticket: React.FC<ITicketItemState> = ({id, subject, author, agent, status, updated_at, loading = false}) => {
  const {hasRole, takeTicket} = useStore()
  const {gotoTicket} = useFunctions()
  const openTicketPage = () => gotoTicket(id)
  const statusText = ticketStatuses[status]
  const freeBadge = (<span className="badge bg-primary">{CONSTANTS.NOT_ASSIGNED_TICKET_STATUS}</span>)
  const takeHandler = (e: React.MouseEvent) => {
    e.stopPropagation()
    takeTicket(id)
  }
  const takeBtn = (<button disabled={loading} className="btn btn-sm btn-success" onClick={takeHandler}>{loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Take'}</button>)
  const ticketAgent = agent ? agent : hasRole('agent') && status ? takeBtn : freeBadge
  const replied = new Date(updated_at).toLocaleString()
  const badgeClasses = ['bg-danger', 'bg-warning', 'bg-success']
  const badgeClass = ['badge', ...[badgeClasses[status]]].join(' ')
  return (
    <tr onClick={openTicketPage}>
      <th scope="row">{id}</th>
      <td>{subject}</td>
      {hasRole(userRoles.agent) && (<td>{author}</td>)}
      <td>{ticketAgent}</td>
      <td><span className={badgeClass}>{statusText}</span></td>
      <td>{replied}</td>
    </tr>
  )
}

export default Ticket