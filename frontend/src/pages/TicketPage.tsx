import React, {useEffect, useState, useRef} from 'react'
import {useParams} from 'react-router-dom'
import useAPI from '../services/api'
import Loader from '../components/Loader'
import {ticketStatuses} from '../constants'
import TicketInfo from '../components/TicketInfo'
import Reply from '../components/Reply'

const TicketPage: React.FC = () => {
  const {id: ticketId} = useParams<{id: string}>()
  const [editorReady, setEditorReady] = useState<boolean>(false)
  const {getTicket, loading: ticketLoading, getData} = useAPI()  
  useEffect(()=>{
    getTicket(ticketId)
  }, [getTicket, ticketId])
  const pageReady = ! ticketLoading && editorReady
  const ticketData = getData('ticket', {})
  const {agent, status} = ticketData
  const responses = getData('responses', [])
  const statusText = ticketStatuses[status]
  const statusClasses = ['bg-danger', 'bg-warning', 'bg-success']
  const cardClass = ['card', ...[statusClasses[status]]].join(' ')

  let ticketContainerClass = ['ticket-container']

  if( pageReady ) {
    ticketContainerClass.push('ready')
  }

  
  return (
    <div className="ticket-page">
      <div className="ticket-header main-header">
        <h1>Ticket</h1>
      </div>
      {!pageReady && <Loader />}
      <div className={ticketContainerClass.join(' ')}>
        <div className="row">
          <div className="col-lg-3 order-lg-2">
            <div className="ticket-meta">
              <div className={cardClass}>
                <div className="card-body">
                  <span className="ticket-status">{statusText}</span>
                  <div className="ticket-agent">{agent ? agent : 'Not assigned'}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 order-lg-1">
            <TicketInfo ticket={ticketData} />            
            <Reply setEditorReady={() => setEditorReady(true)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketPage