import React, {FC, ReactElement, InputHTMLAttributes, ChangeEvent} from 'react'
import {IconProp} from '@fortawesome/fontawesome-svg-core'

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean
  size?: InputSize
  icon?: IconProp
  prepend?: string | ReactElement
  append?: string | ReactElement
  onChange:(e:ChangeEvent<HTMLInputElement>) => void
}

const Input:FC<InputProps> = () => {
  return (
    <div></div>
  )
}
export default Input
