import {FC} from 'react'

import Menu, {MenuProps} from './menu'
import MenuItem, {MenuItemBaseProps} from './menuItem'
import SubMenu, {SubMenuProps} from './subMenu'

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemBaseProps>,
  SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent
TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu
