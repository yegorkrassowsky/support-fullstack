import React from 'react'
import {ITicket} from '../interfaces'

type TicketInfoProps = {
  ticket: ITicket
  changeStatusHandler: () => void
  loading: boolean
}
const TicketInfo: React.FC<TicketInfoProps> = ({ticket, changeStatusHandler, loading}) => {
  const {id, subject, content, status} = ticket
  const openCloseBtnText = status === 0 ? 'Reopen' : 'Close'
  const changeStatusLoading = <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</>
  const changeStatusClasses = ['btn', (status ? 'btn-outline-danger' : 'btn-outline-success')]
  return (
    <div className="ticket-info">
      <div className="ticket-header">
        <span className="ticket-subject">#{id}. {subject}</span>
        <div className="controls">
          <button disabled={loading} type="button" className={changeStatusClasses.join(' ')} onClick={changeStatusHandler}>
            {loading ? changeStatusLoading : openCloseBtnText}
          </button>
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