import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { FrameworkBodyComponent } from './components/framework-body/framework-body.component';
import { ContentComponent } from './components/content/content.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { FrameworkConfigService } from './services/framework-config.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { ScreenService } from './services/screen.service';
import { ScreenLargeDirective } from './directives/screen-large.directive';
import { ScreenBelowLargeDirective } from './directives/screen-below-large.directive';
import { MenuService } from './services/menu.service';
import { MenuComponent } from './components/menus/menu/menu.component';
import { MenuItemComponent } from './components/menus/menu-item/menu-item.component';
import { PopupMenuComponent } from './components/menus/popup-menu/popup-menu.component';
import { SignInComponent } from './components/users/sign-in/sign-in.component';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [FrameworkBodyComponent, ContentComponent, TitleBarComponent, TopBarComponent, StatusBarComponent, ScreenLargeDirective, ScreenBelowLargeDirective, MenuComponent, MenuItemComponent, PopupMenuComponent, SignInComponent, RegisterUserComponent],
  exports: [FrameworkBodyComponent], // , ContentComponent, TitleBarComponent, TopBarComponent, StatusBarComponent, MenuComponent
  providers: [FrameworkConfigService, ScreenService, MenuService],
})
export class SsModule { }
