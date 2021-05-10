import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import useAPI from '../services/api'
import Loader from '../components/Loader'

const TicketPage: React.FC = () => {
  const {id: ticketId} = useParams<{id: string}>()
  const {getTicket, loading, getData} = useAPI()  
  useEffect(()=>{
    getTicket(ticketId)
  }, [getTicket, ticketId])
  const subject = getData('subject', '')
  return (
    <div className="ticket-page">
      {loading ? <Loader /> : (
        <>
          <div className="ticket-header">
            <h1>{subject}</h1>
          </div>
          <div className="ticket-container">

          </div>
        </>
    ) }
    </div>
  )
}

export default TicketPage