import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameworkBodyComponent } from './framework-body/framework-body.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FrameworkBodyComponent, ContentComponent],
  exports: [
    FrameworkBodyComponent, ContentComponent
  ],
})
export class SsModule { }
