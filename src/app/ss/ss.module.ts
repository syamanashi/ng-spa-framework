import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameworkBodyComponent } from './framework-body/framework-body.component';
import { ContentComponent } from './content/content.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { FrameworkConfigService } from './services/framework-config.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FrameworkBodyComponent, ContentComponent, TitleBarComponent],
  exports: [FrameworkBodyComponent, ContentComponent, TitleBarComponent],
  providers: [FrameworkConfigService],
})
export class SsModule { }
