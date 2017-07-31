import { Injectable } from '@angular/core';

import { MenuItem } from '../menus/menu-item/menu-item.model';

@Injectable()
export class MenuService {

  /** Array of menu items */
  items: Array<MenuItem>;

  /** Whether or not we display the vertical menu (and hide the horizontal menu) */
  isVertical = false;

  /** Keeps track of whether or not we are showing the left-hand side vertical menu */
  showingLeftSideMenu = false; // gets set to true when the left-side menu shows.

  toggleLeftSideMenu(): void {
    this.isVertical = true; // Set isVertical to true since toggleLeftSideMenu() only gets called when *screenBelowLarge is true.
    this.showingLeftSideMenu = !this.showingLeftSideMenu;
  }

}
