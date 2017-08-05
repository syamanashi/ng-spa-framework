import { Component } from '@angular/core';

// Framework imports
import { FrameworkConfigService, FrameworkConfigSettings } from './ss/services/framework-config.service';
import { MenuService } from './ss/services/menu.service';

// App imports
import { initialMenuItems } from './app.menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  // Use the depencency injection engine creates an instance of FrameworkConfigService.
  constructor(
    private frameworkConfigService: FrameworkConfigService,
    private menuService: MenuService,
  ) {

    const config: FrameworkConfigSettings = {
      socialIcons: [
        { imageFile: 'assets/images/social-fb-bw.png', alt: 'Facebook', link: 'http://www.facebook.com' },
        { imageFile: 'assets/images/social-google-bw.png', alt: 'Google', link: 'http://www.google.com' },
        { imageFile: 'assets/images/social-twitter-bw.png', alt: 'Twitter', link: 'http://www.twitter.com' },
      ],
      showLanguageSelector: true,
      showUserControls: true,
      showStatusBar: true,
      showStatusBarBreakpoint: 800,
      companyName: 'Green Nations',
      showCopyright: true,
      copyrightSince: '2011',
    };

    frameworkConfigService.configure(config);

    menuService.items = initialMenuItems;

  }
}
