import { Injectable } from '@angular/core';

import { MenuItem } from '../menus/menu-item/menu-item.model';

@Injectable()
export class MenuService {

  items: Array<MenuItem>;
  isVertical = false;

}
