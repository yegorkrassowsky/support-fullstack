import React, {useState, useRef, useEffect} from 'react'
import InputErrors from '../components/InputErrors'
import { Editor } from '@tinymce/tinymce-react'
import useAPI from '../services/api'
import Loader from '../components/Loader'

const NewTicketPage: React.FC = () => {
  const {newTicket, loading, errors, getError} = useAPI()
  const [subject, setSubject] = useState<string>('')
  const [validated, setValidated] = useState<boolean>(false)
  const [editorReady, setEditorReady] = useState<boolean>(false)
  const editorRef = useRef<any>()
  const subjectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }
  useEffect(()=>{
    if(!loading && errors) {
      setValidated(true)
    }
  }, [loading, errors])

  useEffect(()=>{
    if(editorRef.current !== undefined) {
      editorRef.current.mode.set( loading ? 'readonly' : 'design' )
    }
  }, [loading])

  let containerClass = ['new-ticket-container']
  let subjectClass = ['form-control']
  let contentClass = ['tinymce-wrapper']

  if(validated) {
    subjectClass.push(getError('subject') ? 'is-invalid' : 'is-valid')
    contentClass.push(getError('content') ? 'is-invalid' : 'is-valid')
  }

  if(editorReady) {
    containerClass.push('ready')
  }

  const subjectErrors = getError('subject') ? <InputErrors errors={errors!.subject} /> : null
  const contentErrors = getError('content') ? <InputErrors errors={errors!.content} /> : null

  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (editorRef.current) {
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
              <div className={contentClass.join(' ')}>
                <Editor
                  apiKey="2k6p2xtgsbnwtu65rs5p9yvjwnvq9u3dk8qad3tcu00nct0z"
                  onInit={(evt, editor) => editorRef.current = editor}
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    setup: (editor) => {
                      editor.on('init', (e) => {
                        setEditorReady(true)
                      })
                    },
                  }}
                />
              </div>
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