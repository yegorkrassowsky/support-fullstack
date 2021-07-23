import React from 'react'
import {connect} from 'react-redux'
import {changeStatus} from '../actions/ticket'
import { ITicket, IState } from '../interfaces'
import {ThunkDispatchType, ChangeStatusType} from '../types'

type TicketInfoProps = {
  ticket: ITicket | null
  loading: boolean
  changeStatus: ChangeStatusType
}

const TicketInfo: React.FC<TicketInfoProps> = ({ticket, loading, changeStatus}) => {
  if(!ticket){
    return (<></>)
  }
  const {id, author, subject, content, status} = ticket
  const changeStatusHandler = () => changeStatus(id, status ? 0 : 1)
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

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  changeStatus: (ticketId: number, status: number) => dispatch(changeStatus(ticketId, status)),
})

export default connect((state: IState) => ({
  ticket: state.ticket.data,
  loading: state.ticket.changeStatusLoading,
}), mapDispatchToProps)(TicketInfo)