import {FC} from 'react'

import Tab, {TabProps} from './tabs'
import TabItem, {TabItemProps} from './tabItem'

export type ITabComponent = FC<TabProps> & {
  Item: FC<TabItemProps>,
}

const TransTab = Tab as ITabComponent
TransTab.Item = TabItem

export default TransTab
