import { Component, OnInit } from '@angular/core';

import { FrameworkConfigService } from '../../services/framework-config.service';
import { UserApi } from '../users/user-api';

@Component({
  selector: 'ss-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(
    protected frameworkConfigService: FrameworkConfigService,
    private userApi: UserApi,
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.userApi.signOut(); // We don't care about the observable that's being returned.
  }

}
