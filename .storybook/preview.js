import React from 'react'
import {addDecorator,addParameters} from '@storybook/react'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

import '../src/styles/index.scss'
import './table.scss'

const styles= {
  textAlign: 'center'
}

const CenterDecorator = (storyFn) => (
  <div style={styles}>{storyFn()}</div>
)

addDecorator(CenterDecorator)
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});
