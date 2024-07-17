import React from 'react'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Typography } from 'antd'

interface EditorComponentProps {
  id?: string
  value?: string
  onChange?: (value: string) => void
}

const EditorComponent: React.FC<EditorComponentProps> = ({ id, value = '', onChange }) => {
  return (
    <div className='App' id={id}>
      <Typography.Title level={4}>Job Description</Typography.Title>
      <CKEditor
        editor={Editor}
        data={value}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor)
        }}
        onChange={(event, editor) => {
          // console.log(event)
          // onEditorChange
          onChange?.(editor.data.get())
          console.log(editor.data.get())
        }}
        // onBlur={(event, editor) => {
        //   console.log('Blur.', editor)
        // }}
        // onFocus={(event, editor) => {
        //   console.log('Focus.', editor)
        // }}
      />
    </div>
  )
}

export default EditorComponent
