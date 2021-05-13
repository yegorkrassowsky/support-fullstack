import React, {useRef, useEffect} from 'react'
import useAPI from '../services/api'
import Editor from './Editor'
import InputErrors from '../components/InputErrors'

type ReplyProps = {
  setEditorReady: () => void
}

const Reply: React.FC<ReplyProps> = ({setEditorReady}) => {
  const {newResponse, loading, errors, getError} = useAPI()
  const editorRef = useRef<any>()
  const setEditor = (editor: any) => {
    editorRef.current = editor
    setEditorReady()
  }

  const validated = !!errors
  const contentErrors = getError('content') ? <InputErrors errors={getError('content')} /> : null

  useEffect(()=>{
    if(editorRef.current !== undefined) {
      editorRef.current.mode.set( loading ? 'readonly' : 'design' )
    }
  }, [loading])

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (editorRef.current) {
      newResponse({
        content: editorRef.current.getContent()
      })
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
          <Editor validated={validated} errors={getError('content')} setEditor={setEditor} />
          {contentErrors}
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