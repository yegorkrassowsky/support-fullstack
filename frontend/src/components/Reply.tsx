import React, {useRef, useEffect} from 'react'
import Editor from './Editor'
import InputErrors from '../components/InputErrors'
import { useStore } from '../services/store'

type ReplyProps = {
  ticketId: number
  setEditorReady: () => void
}

const Reply: React.FC<ReplyProps> = ({ticketId, setEditorReady}) => {
  const {addResponse, ticket} = useStore()
  const {errors, loading} = ticket.addResponse
  const contentErrors = errors?.content || null

  const editorRef = useRef<any>()
  const setEditor = (editor: any) => {
    editorRef.current = editor
    setEditorReady()
  }

  useEffect(()=>{
    if(editorRef.current !== undefined) {
      editorRef.current.mode.set( loading ? 'readonly' : 'design' )
    }
  }, [loading])

  const resetEditor = () => editorRef.current.setContent('')
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (editorRef.current) {
      addResponse(ticketId, editorRef.current.getContent(), resetEditor)
    }
  }

  return (
    <div id="newReply" className="reply-container">
    <form onSubmit={submitHandler}>
      <fieldset disabled={loading}>
        <div className="form-header">
          <label className="form-label" onClick={()=>editorRef.current.focus()}>Add response</label>
        </div>
        <div className="form-body">
          <Editor validated={!!errors} errors={!!contentErrors} setEditor={setEditor} />
          {contentErrors && <InputErrors errors={contentErrors} />}
        </div>
        <div className="form-footer">
          {loading ? (
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
            </button>) : (
            <button type="submit" className="btn btn-primary">Submit</button>
          )}
        </div>
      </fieldset>
    </form>
  </div>

  )
}

export default Reply