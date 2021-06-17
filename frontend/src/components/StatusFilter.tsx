import React from 'react'
import {connect} from 'react-redux'
import {ticketStatuses} from '../constants'
import {ThunkDispatchType, SetTicketListStatusType, TicketListStatusType} from '../types'
import {setTicketListStatus} from '../actions/ticketList'

type StatusFilterProps = {
  currentStatus: TicketListStatusType
  setTicketListStatus: SetTicketListStatusType
}

const StatusFilter: React.FC<StatusFilterProps> = ({currentStatus, setTicketListStatus}) => {
  const labelText = 'Filter by Status'
  return (
    <div className="status-filter">
      <label className="col-form-label me-2">{labelText}</label>
      <div>
        {ticketStatuses.map((status, index) => {
          const btnClass = ['btn']
          const btnClasses = ['btn-danger', 'btn-warning', 'btn-success']
          if(btnClasses[index] !== undefined){
            btnClass.push(btnClasses[index])
          }
          if(currentStatus !== null && index !== currentStatus){
            btnClass.push('muted')
          }
          return <button onClick={(() => setTicketListStatus(index))} key={index} className={btnClass.join(' ')} value={index}>{status}</button>
        })}
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatchType) => {
  return {
    setTicketListStatus: (status: TicketListStatusType) => dispatch(setTicketListStatus(status))
  }
}

export default connect(null, mapDispatchToProps)(StatusFilter)
