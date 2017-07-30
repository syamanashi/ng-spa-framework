import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FrameworkBodyComponent } from './framework-body/framework-body.component';
import { ContentComponent } from './content/content.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { FrameworkConfigService } from './services/framework-config.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { ScreenService } from './services/screen.service';
import { ScreenLargeDirective } from './directives/screen-large.directive';
import { ScreenBelowLargeDirective } from './directives/screen-below-large.directive';
import { MenuService } from './services/menu.service';
import { MenuComponent } from './menus/menu/menu.component';
import { MenuItemComponent } from './menus/menu-item/menu-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [FrameworkBodyComponent, ContentComponent, TitleBarComponent, TopBarComponent, StatusBarComponent, ScreenLargeDirective, ScreenBelowLargeDirective, MenuComponent, MenuItemComponent],
  exports: [FrameworkBodyComponent], // , ContentComponent, TitleBarComponent, TopBarComponent, StatusBarComponent, MenuComponent
  providers: [FrameworkConfigService, ScreenService, MenuService],
})
export class SsModule { }
