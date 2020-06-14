import React,{createContext,useState} from 'react'
import classnames from 'classnames'
import {TabItemProps} from './tabItem'

type TabMode='normal'|'card'
type SelectCallback=(selectIndex:number,content?:any)=>void

export interface TabProps {
  children?:React.ReactNode
  className?:string
  style?:React.CSSProperties
  mode?:TabMode,
  defaultIndex?:number
  onSelect?:SelectCallback
}
interface TabContext {
  index:number
  onSelect?:SelectCallback
  mode?:string
}

export const TabContext=createContext<TabContext>({
  index:0
})
const Tabs:React.FC<TabProps>=(props)=>{
  let {children=[],className,style,mode,defaultIndex=0,onSelect}=props
  const [currentActive,setActive]=useState(defaultIndex)
  const childrenElm=children as React.FunctionComponentElement<TabItemProps> []
  const [tabViewContent,setTabViewContent]=useState(childrenElm[defaultIndex].props.children)
  const classes=classnames('viking-tabs',className)
  const handleClick:SelectCallback=(index,children)=>{
    setActive(index)
    setTabViewContent(children)
    if(onSelect){
      onSelect(index)
    }
  }
  const renderChild=()=>{
    return React.Children.map(children,(child,index)=>{
      const childElement=child as React.FunctionComponentElement<TabItemProps>
      const {displayName}=childElement.type
      if(displayName==='TabItem'){
        return React.cloneElement(childElement,{
          index
        })
      }
      else{
        console.error('Warning:Tabs has a child which is not ')
      }
    })
  }
  const context:TabContext={
    index:currentActive||0,
    onSelect:handleClick,
    mode
  }

  return  (
    <div className={classes} style={style} data-testid='test-tabs-container'>
      <TabContext.Provider value={context}>
      <ul className='viking-tabs-nav' data-testid="test-tabs">
      {renderChild()}
      </ul>
      </TabContext.Provider>
      <div className='tab-view' data-testid='test-tab-view'>
        {tabViewContent}
      </div>
    </div>
  )
}

Tabs.defaultProps={
  mode:'normal',
  defaultIndex:0
}

export default Tabs
