import React from 'react'
import { useStore } from '../services/store'

const TicketInfo: React.FC = () => {
  const {ticket: {data: ticket, changeStatusLoading: loading}, changeStatus} = useStore()
  const id = ticket?.id || null
  const author = ticket?.author || null
  const subject = ticket?.subject || null
  const content = ticket?.content || null
  const status = ticket?.status === undefined ? 1 : ticket.status
  const changeStatusHandler = () => changeStatus(id!, status ? 0 : 1)
  const openCloseBtnText = status === 0 ? 'Reopen' : 'Close'
  const changeStatusLoading = <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  const changeStatusClasses = ['btn', (status ? 'btn-outline-danger' : 'btn-outline-success')]
  return (
    <div className="ticket-info">
      <div className="ticket-header">
        <div className="ticket-header-container">
          <div className="ticket-author"><i className="far fa-user"></i> {author}</div>
          <div className="ticket-subject">#{id}. {subject}</div>
        </div>
        <div className="controls">
          <button disabled={loading} type="button" className={changeStatusClasses.join(' ')} onClick={changeStatusHandler}>
            {loading ? changeStatusLoading : openCloseBtnText}
          </button>
        </div>
      </div>
      {content && <div className="ticket-body" dangerouslySetInnerHTML={{__html:content}}></div>}
      <div className="ticket-footer">
        <a href="#newReply" className="btn btn-primary">Reply</a>
      </div>
    </div>
  )
}

export default TicketInfo