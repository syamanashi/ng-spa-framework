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

  /** Mock development variables to help test error handling. */
  // TODO: Convert these into config vars to help with development:
  isFakeError = false;
  isFakeDelay = false;
  fakeDelay = 2000;

  constructor(private router: Router) { }

  signIn(username: string, password: string, rememberMe: boolean): Observable<any> {
    // TODO: Create an REST API Service that with a signIn method that would get called here.  Must return an Observable.
    console.log('UserService.signIn: ' + username + ' ' + password + ' ' + rememberMe);

    if (!this.isFakeError) {
      this.isAuthenticated = true;

      if (this.isFakeDelay) {
        return Observable.of({}).delay(this.fakeDelay); // Returns empty reservable.  Adding delay for actual api request/response effect
      } else {
        return Observable.of({}); // Returns empty reservable
      }

    } else {

      // In this case we return an Observable thrown error with an error string that our framework will use.
      if (this.isFakeDelay) {
        // Sending an empty object observable in order to add a delay... Then we call flatMap which returns a real observable:
        // A flatMap has the ability to take our original Observable (x) and replace it with another one.
        return Observable.of({}).delay(this.fakeDelay).flatMap(x => Observable.throw('Invalid User Name and/or Password'));
      } else {
        return Observable.throw('Invalid User Name and/or Password');
      }

    }
  }

  signOut(): Observable<any> {
    this.isAuthenticated = false;
    this.router.navigate(['/signin']);
    return Observable.of({}); // returns empty reservable
  }

}
