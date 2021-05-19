import React from 'react'
import { Editor as TinyMCE } from '@tinymce/tinymce-react'

type EditorProps = {
  errors: boolean
  validated: boolean
  setEditor: (editor: any) => void
}

const Editor: React.FC<EditorProps> = ({errors = false, validated = false, setEditor}) => {
  let contentClass = ['tinymce-wrapper']
  if(validated) {
    contentClass.push(errors ? 'is-invalid' : 'is-valid')
  }
  return (
    <div className={contentClass.join(' ')}>
      <TinyMCE
        apiKey="2k6p2xtgsbnwtu65rs5p9yvjwnvq9u3dk8qad3tcu00nct0z"
        onInit={(evt, editor) => setEditor(editor)}
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
        }}
      />
    </div>
  )
}

export default Editor