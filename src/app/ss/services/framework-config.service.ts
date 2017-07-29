import { Injectable } from '@angular/core';

export interface IconFiles {
  imageFile: string;
  alt: string;
  link: string;
}

export interface FrameworkConfigSettings {
  showLanguageSelector?: boolean;
  showUserControls?: boolean;
  showStatusBar?: boolean;
  showStatusBarBreakpoint?: number;
  socialIcons?: Array<IconFiles>;
}

/**
 * Sets framework config values. Overrides default values with configure() method that accepts a <FrameworkConfigSettings> object.
 *
 * @export
 * @class FrameworkConfigService
 */
@Injectable()
export class FrameworkConfigService {

  /** Company Name that appears in the footer */
  companyName = 'Suttonsoft, Inc.';

  /** Whether or not the copyright message appears in the status bar/footer.  Defaults to true. */
  showCopyright = true;

  /** First year of copyright that appears in the footer. Defaults to empty string. */
  copyrightSince = '';


  /** Whether or not the LanguageSelector drop down appears.  Defaults to true. */
  showLanguageSelector = true;

  /** Whether or not the UserControls appear (e.g. sign in).  Defaults to true. */
  showUserControls = true;

  /** Whether or not the StatusBar appears.  Defaults to true. */
  showStatusBar = true;

  /** Sets the status bar breakpoint.   Defaults to 0. */
  showStatusBarBreakpoint = 0;

  /** Array of social icons image file objects. */
  socialIcons = new Array<IconFiles>();

  /** Accepts an object that implements FrameworkConfigSettings, overriding config default values,
   *  and adding these settings to the framework's "this" scope.
  */
  configure(settings: FrameworkConfigSettings): void {
    Object.assign(this, settings); // takes the settings that are passed in and assigns them to 'this' object (FrameworkConfigService).
  }

}
