import React, {useEffect, useState} from 'react'
import apiClient from '../services/api'
import {useStore} from '../store'
import TicketList from '../components/TicketList'
import {ITicket} from '../interfaces'

const TicketListPage: React.FC = () => {
  const {loggedIn} = useStore()
  const [tickets, setTickets] = useState<ITicket[]>([])
  useEffect(()=>{
    if(loggedIn){
      apiClient.get('/api/ticket')
      .then(response => setTickets(response.data))
      .catch(error => console.error(error))
    }
  }, [loggedIn])
  return (
    <div>
      <h1>Tickets</h1>
      <TicketList tickets={tickets} />
    </div>
  )
}

export default TicketListPage