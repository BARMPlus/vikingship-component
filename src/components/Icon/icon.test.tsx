import React from 'react'
import {render,RenderResult} from '@testing-library/react'
import Icon,{IconProps} from './icon'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'

library.add(faArrowDown)

let testProps:IconProps={
  icon:'arrow-down',
  theme:'primary'
}


let wrapper:RenderResult

describe('icon组件单元测试',()=>{
  it('icon 属性测试',()=>{
   wrapper=render(<Icon {...testProps}></Icon>)
   const element=wrapper.container.querySelector('svg') as SVGSVGElement
    expect(element.dataset.icon).toEqual('arrow-down')
    expect(element).toHaveClass('viking-icon icon-primary')
  })
})


