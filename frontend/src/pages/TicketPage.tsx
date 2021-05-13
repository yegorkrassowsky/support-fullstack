import React, {useEffect, useState, useRef} from 'react'
import {useParams} from 'react-router-dom'
import useAPI from '../services/api'
import Loader from '../components/Loader'
import {ticketStatuses} from '../constants'
import InputErrors from '../components/InputErrors'
import Editor from '../components/Editor'

const TicketPage: React.FC = () => {
  const {id: ticketId} = useParams<{id: string}>()
  const [editorReady, setEditorReady] = useState<boolean>(false)
  const editorRef = useRef<any>()
  const setEditor = (editor: any) => {
    editorRef.current = editor
    setEditorReady(true)
  }
  const {getTicket, loading: ticketLoading, getData} = useAPI()  
  useEffect(()=>{
    getTicket(ticketId)
  }, [getTicket, ticketId])
  const pageReady = ! ticketLoading && editorReady
  const subject = getData('subject')
  const content = getData('content')
  const agent = getData('agent', 'Not assigned')
  const status = getData('status', 1)
  const statusText = ticketStatuses[status]
  const statusClasses = ['bg-danger', 'bg-warning', 'bg-success']
  const cardClass = ['card', ...[statusClasses[status]]].join(' ')

  const {newResponse, loading: formLoading, errors: formErrors, getError: getFormError} = useAPI()
  const validated = !!formErrors
  useEffect(()=>{
    if(editorRef.current !== undefined) {
      editorRef.current.mode.set( formLoading ? 'readonly' : 'design' )
    }
  }, [formLoading])

  let ticketContainerClass = ['ticket-container']

  if( pageReady ) {
    ticketContainerClass.push('ready')
  }

  const contentErrors = getFormError('content') ? <InputErrors errors={getFormError('content')} /> : null
  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (editorRef.current) {
      newResponse({
        content: editorRef.current.getContent()
      })
    }
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
                  <div className="ticket-agent">{agent}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 order-lg-1">
            <div className="ticket-info">
              <div className="ticket-header">
                <span className="ticket-subject">#{ticketId}. {subject}</span>
                <div className="controls">
                <button type="button" className="btn btn-outline-secondary">Close</button>
                </div>
              </div>
              <div className="ticket-body" dangerouslySetInnerHTML={{__html:content}}></div>
              <div className="ticket-footer">
                <a href="#addResponse" className="btn btn-primary">Add response</a>
              </div>
            </div>
            <div id="addResponse" className="add-response">
              <form onSubmit={submitHandler}>
                <fieldset disabled={formLoading}>
                  <div className="form-header">
                    <label className="form-label" onClick={()=>editorRef.current.focus()}>Add response</label>
                  </div>
                  <div className="form-body">
                    <Editor validated={validated} errors={getFormError('content')} setEditor={setEditor} />
                    {contentErrors}
                  </div>
                  <div className="form-footer">
                    {formLoading ? (
                      <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
                      </button>) : (
                      <button type="submit" className="btn btn-primary">Submit</button>
                    )}
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketPage