import React from 'react'
import {render, fireEvent,wait, cleanup, RenderResult} from '@testing-library/react'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'


import Menu, {MenuProps} from './menu'
import SubMenu from './subMenu'
import MenuItem from './menuItem'


library.add(faAngleDown)

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props} >
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  )
}


let wrapper: RenderResult,
  menuElement: HTMLElement, activeElement: HTMLElement,
  disabledElement: HTMLElement

const createStyleFile=()=>{
  const cssFile:string=`
   .viking-submenu{
     display:none;
   }
   .viking-submenu.menu-opened{
     display:block;
   }
  `
  const style=document.createElement('style')
  style.type='text/css'
  style.innerHTML=cssFile
  return style
}


describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
    wrapper.container.append(createStyleFile())
  })
  it('提供默认属性，是否显示正常的class', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('点击以后，是否切换到正常的item和callback是否正常执行', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('传入mode以后，是否展示对应的class', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('检测 subMenu horizontal是否正常', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeInTheDocument()
    const dropdownElement=wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await wait(()=>{
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await wait(()=>{
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })
  it('检测 subMenu vertical是否正常',()=>{
    cleanup()
    const wrapper=render(generateMenu({
      defaultIndex: '0',
      mode: 'vertical',
      defaultOpenSubMenus:['3']
    }))
    wrapper.container.append(createStyleFile())
    expect(wrapper.queryByText('drop1')).toBeInTheDocument()
    expect(wrapper.queryByText('drop1')).toBeVisible()
    fireEvent.click(wrapper.getByText('dropdown'))
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    fireEvent.click(wrapper.getByText('dropdown'))
    expect(wrapper.queryByText('drop1')).toBeVisible()

  })
})



