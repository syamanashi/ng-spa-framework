import { Component, OnInit } from '@angular/core';

import { MenuService } from '../../services/menu.service';
import { ScreenService } from '../../services/screen.service';

@Component({
  selector: 'ss-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(
    protected menuService: MenuService,
    protected screenService: ScreenService,
  ) { }

  ngOnInit() {
  }

}
