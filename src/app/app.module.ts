import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SsModule } from './ss/ss.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CountriesComponent } from './components/countries/countries.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CountriesComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
