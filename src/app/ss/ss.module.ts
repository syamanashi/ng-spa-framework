import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameworkBodyComponent } from './framework-body/framework-body.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FrameworkBodyComponent],
  exports: [
    FrameworkBodyComponent,
  ],
})
export class SsModule { }
