import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SsModule } from '../ss/ss.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
