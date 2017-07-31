import { Component, OnInit } from '@angular/core';

import { FrameworkConfigService } from '../../services/framework-config.service';

/**
 * StatusBarComponent paints a solid dark bar across the bottom of the page and includes a copyright string in light font.
 *
 * @export
 * @class StatusBarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'ss-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  /** Copyright string containing year and company name */
  Copyright: string;

  /** CompanyName should be configurable */
  CompanyName: string;

  constructor(public frameworkConfigService: FrameworkConfigService) {
    this.CompanyName = frameworkConfigService.companyName;
    this.Copyright = frameworkConfigService.copyrightSince.length ? frameworkConfigService.copyrightSince + '-' : '';
  }

  ngOnInit() {

    const now = new Date();
    this.Copyright += `${now.getFullYear()} ${this.CompanyName}`;
  }

}
