import React from 'react'
import {render,fireEvent,cleanup,wait,RenderResult} from '@testing-library/react'
import Alert,{AlertProps} from './alert'

let testProps:AlertProps ={
  closeBtn:false,
  className:'test',
  type:'success',
  title:'我是标题'
}

let wrapper: RenderResult

describe('alert组件单元测试',()=>{

  beforeEach(()=>{
    wrapper=render(<Alert>content</Alert>)
  })

  it('默认属性-测试',()=>{
    const element:HTMLElement=wrapper.getByText('content')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert alert-info')
    expect(element.querySelector('.alert-title')).not.toBeInTheDocument()
    expect(element.querySelector('.alert-close')).toBeInTheDocument()
  })

  it('自定义属性-测试',()=>{
    cleanup()
    wrapper=render(<Alert {...testProps}>content</Alert>)
    const element:HTMLElement=wrapper.getByText('content')
    expect(element).toHaveClass('alert alert-success test')
    const titleElement=element.querySelector('.alert-title') as HTMLElement
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.innerHTML).toBe('我是标题')
    expect(element.querySelector('.alert-close')).not.toBeInTheDocument()
  })

  it('点击关闭按钮-测试',async ()=>{
    const element:HTMLElement=wrapper.getByText('content')
    const closeBtn=element.querySelector('.alert-close') as HTMLElement
    expect(closeBtn).toBeInTheDocument()
    fireEvent.click(closeBtn)
    await wait(()=>{
      expect(element).not.toBeInTheDocument()
    })
  })

})
