import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { UserApi } from '../ss/components/users/user-api';

/**
 * UserService implements the frawework UserApi so that the framework can call
 * this app's signIn() function (or any other user functions we add to the UserApi)
 * without knowing anything about this UserService class.
 */
@Injectable()
export class UserService implements UserApi {

  isAuthenticated = false;

  // Convert these into config vars to help with development:
  isFakeError = false;
  isFakeDelay = false;
  fakeDelay = 2000;

  constructor(private router: Router) { }

  signIn(username: string, password: string, rememberMe: boolean): Observable<any> {
    // TODO: Create an REST API Service that with a signIn method that would get called here.
    console.log('UserService.signIn: ' + username + ' ' + password + ' ' + rememberMe);
    this.isAuthenticated = true;
    return Observable.of({}).delay(2000);
  }

  signOut(): Observable<any> {
    this.isAuthenticated = false;
    this.router.navigate(['/signin']);
    return Observable.of({});
  }

}
