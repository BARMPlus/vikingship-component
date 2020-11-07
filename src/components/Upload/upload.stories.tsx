import React from 'react'
import {action} from '@storybook/addon-actions'
import Upload from './upload'

export default {
  title: 'Upload Component',
  component: Upload,
}

const checkFileSize = (file: File) => {
  if(Math.round(file.size /1024) > 50) {
    alert('file too big')
    return false
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file],'new_name.doc',{type:file.type})
  return Promise.resolve(newFile)
}

export const SimpleUpload = () => (
  <Upload
    action="http://jsonplaceholder.typicode.com/posts"
    beforeUpload={filePromise}
    onChange={action('changed')}
    onProgress={action('progress')}
    onSuccess={action('success')}
    onError={action('error')}
  >
    Upload File
  </Upload>
)
