import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { UserService } from './user.service';

/**
 * AuthGuard implements CanActivate which returns a boolean value:
 * true if the route can be activated;
 * false if the route cannot be activated;
 */
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    console.log('AuthGuardService#canActivate called ' + this.userService.isAuthenticated);

    if (!this.userService.isAuthenticated) {
      console.log('   > Not authenticated.');
      this.router.navigate(['/signin']);
    }
    return this.userService.isAuthenticated;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

}
