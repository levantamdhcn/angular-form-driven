import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in-rf',
  templateUrl: './sign-in-rf.component.html',
  styleUrls: ['./sign-in-rf.component.scss'],
})
export class SignInRfComponent implements OnInit {
  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false),
  });

  onSubmit() {
    console.log(this.signInForm.value);
  }

  constructor() {}

  ngOnInit(): void {}
}
