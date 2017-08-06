import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './ss/components/users/sign-in/sign-in.component';
import { RegisterUserComponent } from './ss/components/users/register-user/register-user.component';

import { AuthenticatedUserComponent } from './components/authenticated-user/authenticated-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CountryMaintComponent } from './components/country-maint/country-maint.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuardService } from './services/auth-guard.service';

export const appRoutes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'register', component: RegisterUserComponent },
  {
    path: 'authenticated', component: AuthenticatedUserComponent, canActivate: [AuthGuardService],
    children: [
      {
        path: '', canActivateChild: [AuthGuardService],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'country-list/:count', component: CountryListComponent },
          { path: 'country-detail/:id/:operation', component: CountryDetailComponent },
          { path: 'country-maint', component: CountryMaintComponent },
          { path: 'settings', component: SettingsComponent },
        ]
      }
    ]
  },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: '**', redirectTo: 'signin', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
