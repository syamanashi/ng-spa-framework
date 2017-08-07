import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SsModule } from './ss/ss.module';
import { UserApi } from './ss/components/users/user-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryMaintComponent } from './components/country-maint/country-maint.component';
import { AuthenticatedUserComponent } from './components/authenticated-user/authenticated-user.component';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AppDataService } from './services/app-data.service';
import { CountryPanelComponent } from './components/panels/country-panel/country-panel.component';
import { ImagePanelComponent } from './components/panels/image-panel/image-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettingsComponent,
    CountryDetailComponent,
    CountryListComponent,
    CountryMaintComponent,
    AuthenticatedUserComponent,
    CountryPanelComponent,
    ImagePanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SsModule,
  ],
  providers: [
    UserService, // Shorthand for pointing the token 'UserService' to the class 'UserService' like this: { provide: UserService, userClass: UserService }.
    { provide: UserApi, useExisting: UserService }, // Dependency Injection: Provides the UserApi "Token" that (points to) binds the app UserService to the framework UserApi. Now we can inject the UserApi token into our framework sign-in component form.
    AuthGuardService,
    AppDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
