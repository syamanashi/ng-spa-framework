import { Component } from '@angular/core';

import { FrameworkConfigService, FrameworkConfigSettings } from './ss/services/framework-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private frameworkConfigService: FrameworkConfigService) {

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
    };

    frameworkConfigService.configure(config);

  }
}
