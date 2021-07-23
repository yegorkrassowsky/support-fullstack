import React, {useState, useEffect} from 'react'
import Loader from '../components/Loader'
import TicketInfo from '../components/TicketInfo'
import TicketMeta from '../components/TicketMeta'
import Reply from '../components/Reply'
import ResponseList from '../components/ResponseList'
import { ILoading, IState } from '../interfaces'
import { connect } from 'react-redux'

type TicketPageProps = {} & ILoading

const TicketPage: React.FC<TicketPageProps> = ({loading}) => {
  const [pageReady, setPageReady] = useState(false)
  const [editorReady, setEditorReady] = useState(false)
  const onEditorReady = () => setEditorReady(true)
  useEffect(()=>{
    if(! pageReady && ! loading && editorReady) {
      setPageReady(true)
    }
  }, [pageReady, loading, editorReady])

  let ticketContainerClass = ['ticket-container']

  if( pageReady ) {
    ticketContainerClass.push('ready')
  }
  
  return (
    <div className="ticket-page">
      <div className="ticket-header main-header">
        <h1>Ticket</h1>
      </div>
      {! pageReady && <Loader />}
      <div className={ticketContainerClass.join(' ')}>
        <div className="row">
          <div className="col-lg-3 order-lg-2">
            <TicketMeta />
          </div>
          <div className="col-lg-9 order-lg-1">
            <TicketInfo />
            <ResponseList loading={loading} />
            <Reply onEditorReady={onEditorReady} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  loading: state.ticket.loading,
}))(TicketPage)
