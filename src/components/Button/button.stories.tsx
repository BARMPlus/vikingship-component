import React from 'react'
import {action} from '@storybook/addon-actions'
import Button from './button'

export default {
  title: 'Button Component',
  component: Button,
};


export const defaultButton = () => (
  <Button onClick={action('clicked')}>default button Test</Button>
)


export const buttonWithSize = () => (
  <React.Fragment>
    <Button size="lg"> large button</Button>
    <Button size="sm"> small button</Button>
  </React.Fragment>
)

export const buttonWithType = () => (
  <React.Fragment>
    <Button btnType="primary"> primary button</Button>
    <Button btnType="danger"> danger button</Button>
    <Button btnType="link" href="https://www.baidu.com"> link button</Button>
  </React.Fragment>
)

/*
storiesOf('Button Component', module)
  .addDecorator(withInfo as any)
  .addParameters({
    info:{
      header: false,
      inline: true
    }
  })
  .add('默认 Button', defaultButton)
  .add('不同尺寸的 Button',buttonWithSize)
  .add('不同类型的 Button',buttonWithType)*/
