import {ITicket} from '../interfaces'
import {ticketStatuses} from '../constants'

const Ticket: React.FC<ITicket> = ({id, title, updated_at}) => {
  const status = 1
  const statusText = ticketStatuses[status]
  const replied = new Date(updated_at).toLocaleString()
  const badgeClasses = ['bg-danger', 'bg-warning', 'bg-success']
  const badgeClass = ['badge', ...[badgeClasses[status]]].join(' ')
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{title}</td>
      <td><span className={badgeClass}>{statusText}</span></td>
      <td>{replied}</td>
    </tr>
  )
}

export default Ticket