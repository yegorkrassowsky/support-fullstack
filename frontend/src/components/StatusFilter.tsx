import React from 'react'
import {ticketStatuses} from '../constants'
import {useStore} from '../services/store'

const StatusFilter: React.FC = () => {
  const {ticketList, setTicketListStatus} = useStore()
  const currentStatus = ticketList.params.status
  const labelText = 'Filter by Status:'
  return (
    <div className="status-filter">
      <label className="col-form-label">{labelText}</label>
      {ticketStatuses.map((status, index) => {
        const btnClass = ['btn', 'ms-2']
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

  )
}

export default StatusFilter