import React, {useState} from 'react'
import Button, {ButtonSize, ButtonType} from './components/Button/button'
import Alert from './components/Alert/alert'
import Dragger from './components/Dragger/dragger'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'
import Icon, {IconProps} from './components/Icon/icon'
import Transition from './components/Transition/transition'
import Upload from './components/Upload/upload'

import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {render, RenderResult} from '@testing-library/react'

library.add(fas)


let testProps: IconProps = {
  icon: 'arrow-down',
  theme: 'primary'
}
const weapper = render(<Icon {...testProps}></Icon>)
console.log(weapper.container)

function App () {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Dragger onFile={(files)=>{console.log('dragger',files)}}>
          <div>Dragger</div>
        </Dragger>
        <Upload action="http://jsonplaceholder.typicode.com/posts" />
        {/* <Tabs onSelect={(index)=>{console.log('select',index)}} mode='card' defaultIndex={2}>
          <TabItem label='选项卡1'>内容1</TabItem>
          <TabItem label='选项卡2' disabled>内容2</TabItem>
          <TabItem label='选项卡3'>内容3</TabItem>
        </Tabs>*/}
        {/*   <Alert title='我是标题' type='success' closeBtn={false}>操作成功</Alert>
        <Alert type='warning'>操作中...</Alert>
        <Alert type='error'>操作中...</Alert>*/}
        {/*  <Button disabled >Hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Link} disabled href='http://www.baidu.com'>Bai Du </Button>*/}
        {/* <Menu defaultIndex='0' mode='horizontal' defaultOpenSubMenus={['2']}
              onSelect={index => {
                console.log(index)
              }}>
          <MenuItem>cool link1</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
        </Menu>*/}
        {/* <Icon icon="arrow-down" theme="danger" size='10x'/>*/}
        {/*<Transition wrapper={true} timeout={300}
                    in={show} animation='zoom-in-left'>
          <div>内容1</div>
          <div>内容1</div>
          <div>内容1</div>
          <div>内容1</div>
          <div>内容1</div>
          <div>内容1</div>
        </Transition>
        <Button onClick={() => {
          setShow(!show)
        }}>按钮</Button>*/}
      </header>
    </div>
  )
}

export default App
