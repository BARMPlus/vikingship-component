import React,{useContext} from 'react'
import classNames from 'classnames'
import { TabContext }from './tabs'


export interface TabItemProps {
  disabled?:boolean,
  index?:number
  className?:string,
  style?:React.CSSProperties,
  label:any,
  children?:React.ReactNode
}

const TabItem:React.FC<TabItemProps>=({label,className,style,index,disabled,children})=>{
  const context=useContext(TabContext)
  const classes=classNames('viking-tabs-nav-item',className,{
    'card-item':context.mode==='card',
    'active':context.index===index,
    'disabled':disabled
  })
  const handleClick=()=>{
    if(context.onSelect&&(typeof index==='number')&&!disabled){
      context.onSelect(index,children)
    }
  }
  return (
    <li className={classes} style={style}
        onClick={handleClick}>{label}</li>
  )
}

TabItem.displayName='TabItem'


export default TabItem
