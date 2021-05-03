import React from 'react'
import {ticketStatuses} from '../constants'

type StatusFilterProps = {
  currentStatus: string
  onChange: (status: string) => void
}

const StatusFilter: React.FC<StatusFilterProps> = ({currentStatus, onChange}) => {
  const labelText = 'Filter by Status:'
  return (
    <div className="status-filter">
      <label className="col-form-label">{labelText}</label>
      {ticketStatuses.map((status, index) => {
        const statusIndex = `${index}`
        const btnClass = ['btn', 'ms-2']
        const btnClasses = ['btn-danger', 'btn-warning', 'btn-success']
        if(btnClasses[index] !== undefined){
          btnClass.push(btnClasses[index])
        }
        if(currentStatus && statusIndex !== currentStatus){
          btnClass.push('muted')
        }
        return <button onClick={(index => onChange(statusIndex))} key={index} className={btnClass.join(' ')} value={index}>{status}</button>
      })}
    </div>

  )
}

export default StatusFilter