import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// Auth
import { AuthNoticeService } from '../../../core/auth';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { ResetPassword } from '../../../_entities/ResetPassword';

@Component({
  selector: 'kt-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  loading = false;
  errors: any = [];
  email: string;
  token: string;
  private unsubscribe: Subject<any>;

  constructor(private authService: AuthService,
    public authNoticeService: AuthNoticeService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.email = queryParams.get("email");
      this.token = queryParams.get("code").split(' ').join('+');
      console.log(decodeURI(queryParams.get("code")));
      console.log(queryParams.get("code").split(' ').join('+'));
    })
    this.initRegistrationForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  initRegistrationForm() {
    this.forgotPasswordForm = this.fb.group({
      password: ['', Validators.compose([
        Validators.required,
      ])],
      passwordConfirmation: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  submit() {
    const controls = this.forgotPasswordForm.controls;
    if (this.forgotPasswordForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    const password = controls['password'].value;
    const passwordConfirmation = controls['passwordConfirmation'].value;

    const resetPassword: ResetPassword = {
      correo: this.email,
      token: this.token,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }

    this.authService.resetPassword(resetPassword).pipe(
      tap(response => {
        if (response) {
          this.authNoticeService.setNotice(response, 'success');
          this.router.navigateByUrl('/login');
        } else {
          this.authNoticeService.setNotice('error', 'danger');
        }
      }),
      takeUntil(this.unsubscribe),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      })
    ).subscribe(
      //result => console.log(result)
    );
  }

}
