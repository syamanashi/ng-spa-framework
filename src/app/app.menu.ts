import { MenuItem } from './ss/components/menus/menu-item/menu-item.model';

export const initialMenuItems: Array<MenuItem> = [
    {
        text: 'Dashboard',
        icon: 'fa-tachometer',
        route: '/dashboard',
        submenu: null,
    },
    {
        text: 'Countries',
        icon: 'fa-flag',
        route: '/countries',
        submenu: null,
    },
    {
        text: 'Settings',
        icon: 'fa-wrench',
        route: '/settings',
        submenu: null,
    },
]
