import { Component, Input, OnInit } from '@angular/core';

import { MenuItem } from './menu-item.model';

@Component({
  selector: 'ss-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() item: MenuItem;

  constructor() { }

  ngOnInit() {
  }

}
