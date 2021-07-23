import React, {useRef, useEffect} from 'react'
import Editor from './Editor'
import InputErrors from '../components/InputErrors'
import {addResponse, setAddResponseErrors} from '../actions/ticket'
import { IFormState, IState } from '../interfaces'
import {AddResponseType, ThunkDispatchType, SetErrorsType, FormErrorsType} from '../types'
import { connect } from 'react-redux'

type ReplyProps = {
  formState: IFormState
  addResponse: AddResponseType
  addResponseErrors: SetErrorsType
  onEditorReady: () => void
}

const Reply: React.FC<ReplyProps> = ({formState, addResponse, addResponseErrors, onEditorReady}) => {
  useEffect(()=>{
    addResponseErrors(null)
  }, [addResponseErrors])

  const {errors, loading} = formState
  const contentErrors = errors?.content || null

  const editorRef = useRef<any>()
  const setEditor = (editor: any) => {
    editorRef.current = editor
    onEditorReady()
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
      addResponse(editorRef.current.getContent(), resetEditor)
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

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  addResponse: (content: string, callback: Function) => dispatch(addResponse(content, callback)),
  addResponseErrors: (errors: FormErrorsType) => dispatch(setAddResponseErrors(errors)),
})

export default connect((state: IState) => ({
  formState: state.ticket.addResponse,
}), mapDispatchToProps)(Reply)