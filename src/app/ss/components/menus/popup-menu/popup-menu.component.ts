import { Component, Input, OnInit } from '@angular/core';

import { MenuService } from '../../../services/menu.service';
import { MenuItem } from '../menu-item/menu-item.model';

@Component({
  selector: 'ss-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss']
})
export class PopupMenuComponent implements OnInit {

  @Input() menuItems: Array<MenuItem>;

  constructor(protected menuService: MenuService) { }

  ngOnInit() {
  }

}
