import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticatedUserComponent } from './components/authenticated-user/authenticated-user.component';
import { SignInComponent } from './ss/components/users/sign-in/sign-in.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CountryMaintComponent } from './components/country-maint/country-maint.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RegisterUserComponent } from './ss/components/users/register-user/register-user.component';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'register', component: RegisterUserComponent },
  {
    path: 'authenticated', component: AuthenticatedUserComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'country-list/:count', component: CountryListComponent },
      { path: 'country-detail/:country', component: CountryDetailComponent },
      { path: 'country-maint', component: CountryMaintComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
  { path: '', component: SignInComponent },
  { path: '**', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
