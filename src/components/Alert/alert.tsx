import React, {useState} from 'react'
import classNames from 'classnames'
import Transition from '../Transition/transition'

interface BaseAlertProps {
  className: string
  type: string
  closeBtn: boolean
  title: string
  children: React.ReactNode
}

export type AlertProps = Partial<BaseAlertProps>

const Alert: React.FC<AlertProps> = (props) => {
  const {children, type, title, className, closeBtn} = props
  const classes = classNames('alert', {
    [`alert-${type}`]: type
  }, className)
  const [show, setShow] = useState(true)
  return (
    <Transition in={show} timeout={300} animation='zoom-in-top'>
      <div className={classes}>
        {title && <span className='alert-title'>{title}</span>}
        {children}
        {closeBtn && <div className='alert-close' onClick={() => {
          setShow(false)
        }}>X</div>}
      </div>
    </Transition>
  )
}

Alert.defaultProps = {
  closeBtn: true,
  type: 'info'
}

export default Alert
