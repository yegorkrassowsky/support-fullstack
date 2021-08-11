import React, {useRef, useEffect, useState} from 'react'
import Editor from './Editor'
import InputErrors from '../components/InputErrors'
import {addResponse, setAddResponseErrors} from '../actions/ticket'
import { IAddResponse, IFormState, IState } from '../interfaces'
import {AddResponseType, ThunkDispatchType, SetErrorsType, FormErrorsType, FilesInputType} from '../types'
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
  const validated = !!errors
  const contentErrors = errors?.content || null
  const [files, setFiles] = useState<FilesInputType>(null)
  const filesErrors = files && errors ? Object.entries(errors).find(([k,v]) => k.startsWith('files'))?.[1] : null

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
      addResponse({content: editorRef.current.getContent(), files}, resetEditor)
    }
  }

  const filesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files)
  }

  let filesClass = ['form-control']
  if(validated && files) {
    filesClass.push(filesErrors ? 'is-invalid' : 'is-valid')
  }


  return (
    <div id="newReply" className="reply-container">
    <form onSubmit={submitHandler}>
      <fieldset disabled={loading}>
        <div className="form-header">
          <label className="form-label" onClick={()=>editorRef.current.focus()}>Add response</label>
        </div>
        <div className="form-body">
          <Editor validated={validated} errors={!!contentErrors} setEditor={setEditor} />
          {contentErrors && <InputErrors errors={contentErrors} />}
        </div>
        <div className="mb-3">
          <label htmlFor="responseInputFiles" className="form-label">Attachments</label>
          <input type="file" onChange={filesHandler} multiple className={filesClass.join(' ')} />
          <div id="filesHelp" className="form-text">Maximum file size: 10 MB.</div>
          {filesErrors && <InputErrors errors={filesErrors} />}
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
  addResponse: (response: IAddResponse, callback: Function) => dispatch(addResponse(response, callback)),
  addResponseErrors: (errors: FormErrorsType) => dispatch(setAddResponseErrors(errors)),
})

export default connect((state: IState) => ({
  formState: state.ticket.addResponse,
}), mapDispatchToProps)(Reply)