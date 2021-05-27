import React, {useState, useRef, useEffect} from 'react'
import {useStore} from '../services/store'
import InputErrors from '../components/InputErrors'
import Loader from '../components/Loader'
import Editor from '../components/Editor'

const NewTicketPage: React.FC = () => {
  const {addTicket, setAddTicketErrors, newTicket: {errors, loading}} = useStore()
  useEffect(()=>{
    setAddTicketErrors(null)
  }, [setAddTicketErrors])
  const validated = !!errors
  const subjectErrors = errors?.subject || null
  const contentErrors = errors?.content || null
  const [subject, setSubject] = useState<string>('')
  const [editorReady, setEditorReady] = useState<boolean>(false)
  const editorRef = useRef<any>()
  const setEditor = (editor: any) => {
    editorRef.current = editor
    setEditorReady(true)
  }
  const subjectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }

  useEffect(()=>{
    if(editorRef.current !== undefined) {
      editorRef.current.mode.set( loading ? 'readonly' : 'design' )
    }
  }, [loading])

  let containerClass = ['new-ticket-container']
  let subjectClass = ['form-control']

  if(validated) {
    subjectClass.push(subjectErrors ? 'is-invalid' : 'is-valid')
  }

  if(editorReady) {
    containerClass.push('ready')
  }
  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (editorRef.current !== undefined) {
      addTicket(subject, editorRef.current.getContent())
    }
  }

  return (
    <div className="new-ticket-page">
      <div className="main-header new-ticket-header">
        <h1>New ticket</h1>
      </div>
      <div className={containerClass.join(' ')}>
        <Loader />
        <form onSubmit={submitHandler}>
          <fieldset disabled={loading}>
            <div className="mb-3">
              <label htmlFor="ticketInputSubject" className="form-label">Subject</label>
              <input value={subject} onChange={subjectHandler} type="text" className={subjectClass.join(' ')} id="ticketInputSubject" />
              {subjectErrors && <InputErrors errors={subjectErrors} />}
            </div>
            <div className="mb-3">
              <label className="form-label" onClick={()=>editorRef.current.focus()}>Content</label>
              <Editor validated={validated} errors={!!contentErrors} setEditor={setEditor} />
              {contentErrors && <InputErrors errors={contentErrors} />}
            </div>
            {loading ? (
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
            </button>) : (
            <button type="submit" className="btn btn-primary">Submit</button>
            )}
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default NewTicketPage