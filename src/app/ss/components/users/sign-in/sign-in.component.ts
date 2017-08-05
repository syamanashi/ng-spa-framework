import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ss-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formError: string;
  submitting = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(signInForm: NgForm) {

  }

}
