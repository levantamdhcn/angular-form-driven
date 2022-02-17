import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  delay,
  filter,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  formSubmit$ = new Subject<any>();
  PASSWORD_PATTERN = '/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/';
  constructor(private fb: FormBuilder, private _api: ApiService) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: [
          '',
          Validators.compose([Validators.required, Validators.maxLength(32)]),
          this.validateUserNameFromAPI.bind(this),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(this.PASSWORD_PATTERN),
          ]),
        ],
        passwordConfirm: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(this.PASSWORD_PATTERN),
          ]),
        ],
      },
      {
        validators: this.validateControlsValue('password', 'passwordConfirm'),
      }
    );
    this.formSubmit$
      .pipe(
        tap(() => this.registerForm.markAsDirty()),
        switchMap(() =>
          this.registerForm.statusChanges.pipe(
            startWith(this.registerForm.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe(() => this.submitForm());
  }
  submitForm() {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    console.log(this.registerForm);
  }

  validateUsername(username: string): Observable<boolean> {
    console.log('Trigger API call');
    let existedUser = ['tamlv', 'hoanpx', 'phuongvh'];
    let isValid = !existedUser.includes(username);

    return of(isValid).pipe(delay(1000));
  }

  validateUserNameFromAPI(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this._api.validateUsername(control.value).pipe(
      map((isValid) => {
        if (isValid) {
          return null;
        }
        return {
          usernameDuplicated: true,
        };
      })
    );
  }
  validateControlsValue(firstControlName: string, secondControlName: string) {
    return function (formGroup: FormGroup) {
      const firstControlValue = formGroup.get(firstControlName);
      const secondControlValue = formGroup.get(secondControlName);
      return firstControlValue === secondControlValue
        ? null
        : {
            valueNotMatch: {
              firstControlValue,
              secondControlValue,
            },
          };
    };
  }
}
