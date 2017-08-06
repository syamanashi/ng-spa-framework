import { MenuItem } from './ss/components/menus/menu-item/menu-item.model';

/**
 * Array of (nested / recursive) menu items with optional sub-menus.
 *      Note: Route should be null when item has a sub-menu.
 *      Note: If route is not null, the sub-menu should be null.
 *      TODO: Generate this dynamically with CMS data.
 */
export let initialMenuItems: Array<MenuItem> = [
  {
    text: 'Dashboard',
    icon: 'fa-tachometer',
    route: 'authenticated/dashboard',
    submenu: null
  },
  {
    text: 'Countries',
    icon: 'fa-flag',
    route: null,
    submenu: [
      {
        text: 'Select',
        icon: 'fa-expand',
        route: null,
        submenu: [
          {
            text: 'USA',
            icon: 'fa-flag',
            route: 'authenticated/country-detail/USA',
            submenu: null
          },
          {
            text: 'India',
            icon: 'fa-flag',
            route: 'authenticated/country-detail/India',
            submenu: null
          },
          {
            text: 'Switzerland',
            icon: 'fa-flag',
            route: 'authenticated/country-detail/Switzerland',
            submenu: null
          }
        ]
      },
      {
        text: 'Top 3',
        icon: 'fa-flag',
        route: 'authenticated/country-list/3',
        submenu: null
      },
      {
        text: 'Top 10',
        icon: 'fa-flag',
        route: 'authenticated/country-list/10',
        submenu: null
      },
      {
        text: 'All',
        icon: 'fa-flag',
        route: 'authenticated/country-list/0',
        submenu: null
      }
    ]
  },
  {
    text: 'Maintenance',
    icon: 'fa-wrench',
    route: null,
    submenu: [
      {
        text: 'Country List',
        icon: 'fa-th-list',
        route: 'authenticated/country-maint',
        submenu: null
      },
      {
        text: 'Settings',
        icon: 'fa-wrench',
        route: 'authenticated/settings',
        submenu: null
      }
    ]
  }
];
