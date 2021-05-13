import React from 'react'
import {ITicket} from '../interfaces'

type TicketInfoProps = {
  ticket: ITicket
}
const TicketInfo: React.FC<TicketInfoProps> = ({ticket}) => {
  const {id, subject, content, status} = ticket
  const openCloseBtnText = status === 0 ? 'Reopen' : 'Close'

  return (
    <div className="ticket-info">
      <div className="ticket-header">
        <span className="ticket-subject">#{id}. {subject}</span>
        <div className="controls">
          <button type="button" className="btn btn-outline-secondary">{openCloseBtnText}</button>
        </div>
      </div>
      <div className="ticket-body" dangerouslySetInnerHTML={{__html:content}}></div>
      <div className="ticket-footer">
        <a href="#newReply" className="btn btn-primary">Reply</a>
      </div>
    </div>
  )
}

export default TicketInfo