import React from 'react'
import {cleanup, fireEvent, render, RenderResult} from '@testing-library/react'


import Tabs, {TabProps} from './tabs'
import TabItem from './tabItem'


const testProps: TabProps = {
  onSelect: jest.fn()
}
const testCardProps: TabProps = {
  className: 'test',
  mode: 'card',
  defaultIndex: 2
}

const generateTabs = (props: TabProps) => {
  return (<Tabs {...props}>
    <TabItem label='选项卡1'>内容1</TabItem>
    <TabItem label='选项卡2' disabled>内容2</TabItem>
    <TabItem label='选项卡3' className='test-class'>内容3</TabItem>
  </Tabs>)
}

let wrapper: RenderResult, activeElement: HTMLElement,
  disabledElement: HTMLElement, normalElement: HTMLElement,
  tabView: HTMLElement, tabs: HTMLElement

describe('测试Tabs组件', () => {
  beforeEach(() => {
    wrapper = render(generateTabs(testProps))
    activeElement = wrapper.getByText('选项卡1')
    disabledElement = wrapper.getByText('选项卡2')
    normalElement = wrapper.getByText('选项卡3')
    tabView = wrapper.getByTestId('test-tab-view')
    tabs = wrapper.getByTestId('test-tabs')
  })
  it('提供默认属性，是否显示正常', () => {
    expect(activeElement).toHaveClass('viking-tabs-nav-item active')
    expect(disabledElement).toHaveClass('viking-tabs-nav-item disabled')
    expect(normalElement).toHaveClass('viking-tabs-nav-item')
    expect(tabView.innerHTML).toEqual('内容1')
    expect(tabs.querySelectorAll(':scope li').length).toEqual(3)
  })
  it('提供自定义class、mode、defaultIndex，是否正常显示', () => {
    cleanup()
    wrapper = render(generateTabs(testCardProps))
    activeElement = wrapper.getByText('选项卡3')
    disabledElement = wrapper.getByText('选项卡2')
    normalElement = wrapper.getByText('选项卡1')
    tabView = wrapper.getByTestId('test-tab-view')
    expect(activeElement).toHaveClass('viking-tabs-nav-item card-item active')
    expect(normalElement).toHaveClass('viking-tabs-nav-item card-item')
    expect(disabledElement).toHaveClass('viking-tabs-nav-item card-item disabled')
    expect(tabView.innerHTML).toEqual('内容3')
    expect(wrapper.getByTestId('test-tabs-container')).toHaveClass('test')
  })
  it('tab点击是否正常，是否执行相应函数', () => {
    fireEvent.click(disabledElement)
    expect(testProps.onSelect).not.toHaveBeenCalled()
    fireEvent.click(normalElement)
    expect(testProps.onSelect).toHaveBeenCalled()
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    expect(normalElement).toHaveClass('active')
    expect(activeElement).not.toHaveClass('active')
  })
  it('TabItem自定义class，是否正常显示class', () => {
     expect(normalElement).toHaveClass('test-class')
  })
})
