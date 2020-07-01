import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/internal/operators/tap';
import { takeUntil, finalize } from 'rxjs/operators';
// Auth
import { AuthNoticeService } from '../../../core/auth';
import { AuthService } from '../../auth/auth.service';
import { Subject } from 'rxjs';
import { Register } from '../../../_entities/Register';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from '../../auth/register/confirm-password.validator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.scss']
})
export class RegistroUsuariosComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  errors: any = [];

  private unsubscribe: Subject<any>;

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
  constructor(
    private authNoticeService: AuthNoticeService,
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    this.unsubscribe = new Subject();
  }

  ngOnInit() {
    this.initRegisterForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      apellidoMaterno:['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      apellidoPaterno: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ]),
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      confirmPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      agree: [false, Validators.compose([Validators.required])]
    }, {
        validator: ConfirmPasswordValidator.MatchPassword
      });
  }

  submit() {
    const controls = this.registerForm.controls;

    // check form
    if (this.registerForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    if (!controls['agree'].value) {
      // you must agree the terms and condition
      // checkbox cannot work inside mat-form-field https://github.com/angular/material2/issues/7891
      // this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
      return;
    }

    const _user: Register = new Register();
    // _user.clear();
    _user.correo = controls['email'].value;
    _user.nombre = controls['nombre'].value;
    _user.apellidoPaterno = controls['apellidoPaterno'].value;
    _user.apellidoMaterno = controls['apellidoMaterno'].value;
    _user.password = controls['password'].value;
    _user.confirmPassword = controls['confirmPassword'].value;
    // _user.roles = [];
    this.auth.register(_user)
      .pipe(
        tap(user => {
          if (user) {
            console.log(user);
            // pass notice message to the login page
            // this.authNoticeService.setNotice('exito', 'success');
            // this.router.navigateByUrl('/login');
          } else {
            console.log('Error');
            // this.authNoticeService.setNotice('Error', 'danger');
          }
        }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      ).subscribe();
  }

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registerForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

}
