import { Component, OnInit } from '@angular/core';

import { FrameworkConfigService } from '../../services/framework-config.service';

@Component({
  selector: 'ss-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(protected frameworkConfigService: FrameworkConfigService) { }

  ngOnInit() {
  }

}
