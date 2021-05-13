import React, {useState, useRef, useEffect} from 'react'
import InputErrors from '../components/InputErrors'
import useAPI from '../services/api'
import Loader from '../components/Loader'
import Editor from '../components/Editor'

const NewTicketPage: React.FC = () => {
  const {newTicket, loading, errors, getError} = useAPI()
  const [subject, setSubject] = useState<string>('')
  const validated = !!errors
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

  if(errors) {
    subjectClass.push(getError('subject') ? 'is-invalid' : 'is-valid')
  }

  if(editorReady) {
    containerClass.push('ready')
  }

  const subjectErrors = getError('subject') ? <InputErrors errors={getError('subject')} /> : null
  const contentErrors = getError('content') ? <InputErrors errors={getError('content')} /> : null

  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (editorRef.current !== undefined) {
      newTicket({
        subject,
        content: editorRef.current.getContent()
      })
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
              {subjectErrors}
            </div>
            <div className="mb-3">
              <label className="form-label" onClick={()=>editorRef.current.focus()}>Content</label>
              <Editor validated={validated} errors={getError('content')} setEditor={setEditor} />
              {contentErrors}
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