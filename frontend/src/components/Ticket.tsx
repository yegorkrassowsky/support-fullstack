import {connect} from 'react-redux'
import {ITicketItemState, IUserRoles, IState} from '../interfaces'
import CONSTANTS, {ticketStatuses, roles} from '../constants'
import {TakeTicketType, ThunkDispatchType} from '../types'
import useFunctions from '../functions'
import {takeTicket} from '../actions/ticketList'

type TicketProps = {
  ticket: ITicketItemState
  takeTicket: TakeTicketType
} & IUserRoles

const Ticket: React.FC<TicketProps> = ({userRoles, ticket, takeTicket}) => {
  const {id, subject, author, agent, status, updated_at, loading = false} = ticket
  const {gotoTicket} = useFunctions()
  const openTicketPage = () => gotoTicket(id)
  const statusText = ticketStatuses[status]
  const freeBadge = (<span className="badge bg-primary">{CONSTANTS.NOT_ASSIGNED_TICKET_STATUS}</span>)
  const takeHandler = (e: React.MouseEvent) => {
    e.stopPropagation()
    takeTicket(id)
  }
  const takeBtn = (<button disabled={loading} className="btn btn-sm btn-success" onClick={takeHandler}>{loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Take'}</button>)
  const ticketAgent = agent ? agent : userRoles.includes(roles.agent) && status ? takeBtn : freeBadge
  const replied = new Date(updated_at).toLocaleString()
  const badgeClasses = ['bg-danger', 'bg-warning', 'bg-success']
  const badgeClass = ['badge', ...[badgeClasses[status]]].join(' ')
  return (
    <tr onClick={openTicketPage}>
      <th scope="row">{id}</th>
      <td className="subject">{subject}</td>
      {userRoles.includes(roles.agent) && <td className="client">{author}</td>}
      <td className="agent">{ticketAgent}</td>
      <td className="status"><span className={badgeClass}>{statusText}</span></td>
      <td className="replied-date">{replied}</td>
    </tr>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  takeTicket: (id: number) => {
    dispatch(takeTicket(id))
  }
})

export default connect((state: IState) => ({
  userRoles: state.auth.userRoles,
}), mapDispatchToProps)(Ticket)
