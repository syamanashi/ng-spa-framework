import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserApi } from '../user-api';

@Component({
  selector: 'ss-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  formError: string;
  submitting = false;

  constructor(
    private userApi: UserApi,
    private router: Router,
  ) { }

  /**
   * onSubmit is passed a reference to an NgForm template reference variable, giving it access to the entire form.
   */
  onSubmit(signInForm: NgForm) {

    // Only do something if the form is valid.
    if (signInForm.valid) {

      console.log('submitting...', signInForm);
      this.submitting = true;
      this.formError = null;

      // UserApi is a token reference to the app's injected UserService, which implements UserApi.
      // UserApi.signIn returns an observable that we can subscribe to.
      this.userApi.signIn(signInForm.value.username, signInForm.value.password, signInForm.value.rememberMe)
        .subscribe((data) => { // success argument gets call when signIn works fine.
          console.log('got valid: ', data);
          this.router.navigate(['/authenticated']);
        },
        (err) => {
          this.submitting = false;
          console.log('got error: ', err);
          this.formError = err;
        }
        );
    }

  }
}
