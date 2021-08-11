import React, {useState, useRef, useEffect} from 'react'
import { connect } from 'react-redux'
import {addTicket, setAddTicketErrors} from '../actions/newTicket'
import InputErrors from '../components/InputErrors'
import Loader from '../components/Loader'
import Editor from '../components/Editor'
import {ThunkDispatchType, AddTicketType, FormErrorsType, SetErrorsType, FilesInputType} from '../types'
import {IAddTicket, IState, IFormState} from '../interfaces'
import useFunctions from '../functions'

type NewTicketPageProps = {
  newTicket: IFormState
  addTicket: AddTicketType
  addTicketErrors: SetErrorsType
}

const NewTicketPage: React.FC<NewTicketPageProps> = ({addTicket, addTicketErrors, newTicket}) => {
  const {gotoTicket} = useFunctions()
  const {errors, loading} = newTicket
  useEffect(()=>{
    addTicketErrors(null)
  }, [addTicketErrors])
  const [subject, setSubject] = useState<string>('')
  const [editorReady, setEditorReady] = useState<boolean>(false)
  const [files, setFiles] = useState<FilesInputType>(null)
  const validated = !!errors
  const subjectErrors = errors?.subject || null
  const contentErrors = errors?.content || null
  const filesErrors = files && errors ? Object.entries(errors).find(([k,v]) => k.startsWith('files'))?.[1] : null
  
  const editorRef = useRef<any>()
  const setEditor = (editor: any) => {
    editorRef.current = editor
    setEditorReady(true)
  }
  const subjectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }

  const filesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files)
  }

  useEffect(()=>{
    if(editorRef.current !== undefined) {
      editorRef.current.mode.set( loading ? 'readonly' : 'design' )
    }
  }, [loading])

  let containerClass = ['new-ticket-container']
  let subjectClass = ['form-control']
  let filesClass = ['form-control']

  if(validated) {
    subjectClass.push(subjectErrors ? 'is-invalid' : 'is-valid')
    if(files){
      filesClass.push(filesErrors ? 'is-invalid' : 'is-valid')
    }
  }

  if(editorReady) {
    containerClass.push('ready')
  }
  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (editorRef.current !== undefined) {
      addTicket({subject, content: editorRef.current.getContent(), files}, gotoTicket)
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
            <div className="mb-3">
              <label htmlFor="ticketInputFiles" className="form-label">Attachments</label>
              <input type="file" onChange={filesHandler} multiple className={filesClass.join(' ')} />
              <div id="filesHelp" className="form-text">Maximum file size: 10 MB.</div>
              {filesErrors && <InputErrors errors={filesErrors} />}
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

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  addTicket: (ticket: IAddTicket, callback: Function) => {
    dispatch(addTicket(ticket, callback))
  },
  addTicketErrors: (errors: FormErrorsType) => dispatch(setAddTicketErrors(errors))
})

export default connect((state: IState) => ({
  newTicket: state.newTicket,
}), mapDispatchToProps)(NewTicketPage)
