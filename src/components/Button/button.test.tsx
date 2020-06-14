import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import Button,{ButtonProps,ButtonSize,ButtonType} from './button'

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass'
}

const linkTestProps:ButtonProps={
  btnType: ButtonType.Link,
  href:'http://www.baidu.com'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}


describe('test Button component',()=>{

  it('should render the correct default button',()=>{
    const wrapper=render(<Button>Nice</Button>)
    const element=wrapper.queryByText('Nice')
    expect(element).toBeTruthy()
    expect(element).toBeInTheDocument()
    expect(element&&element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  })
  it('should render the correct component based on different props',()=>{
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('should render a link when btnType equals link and href is provided',()=>{
    const wrapper = render(<Button {...linkTestProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toHaveClass('btn-link')
    expect(element.tagName).toEqual('A')
  })
  it('should render disabled button when disabled set to true',()=>{
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })

})
