import React from 'react'
import { connect } from 'react-redux'
import TicketList from '../components/TicketList'
import Loader from '../components/Loader'
import { ILoading, IState, ITicketList } from '../interfaces'

type TicketListBodyProps = {} & ILoading & ITicketList

export const TicketListBody: React.FC<TicketListBodyProps> = ({loading, data}) => {
  const listContainerClass = ['ticket-list-container']
  if(loading) {
    listContainerClass.push('loading')
  }

  return (
    <div className={listContainerClass.join(' ')}>
      <Loader />
      {data.length ? <TicketList tickets={data} /> : <div className="tickets-not-found">No tickets found</div> }
    </div>
)
}

const mapStateToProps = (state: IState) => ({
  loading: state.ticketList.loading,
  data: state.ticketList.data,
})

export default connect(mapStateToProps)(TicketListBody)
