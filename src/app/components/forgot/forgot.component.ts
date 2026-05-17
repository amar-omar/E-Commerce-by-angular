
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from '../../shared/ui/alert/alert.component';
import { HttpErrorResponse } from '@angular/common/http';
import { signupValidators } from '../../shared/validators/signupValidator';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
})
export class ForgotComponent {
  steps: number = 1;
  errorMessage: string = '';
  isBtnSubmit: boolean = false;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  forgotPasswords = new FormGroup({
    email: new FormControl(null, [Validators.required , Validators.email]),
  });

  verifyResetCode = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });
  resetPassword = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required]),
  });

  submitStep1 = () => {
    this.isBtnSubmit = true;
    if (this.forgotPasswords.valid) {
      this.authService.forgotPasswords(this.forgotPasswords.value).subscribe({
        next: (res) => {
          this.steps = 2;
          this.isBtnSubmit = false;
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          console.log(err.error.message);
          this.isBtnSubmit = false;
        },
      });
    }
  };
  submitStep2 = () => {
    this.isBtnSubmit = true;
    if (this.verifyResetCode.valid) {
      this.authService.verifyResetCode(this.verifyResetCode.value).subscribe({
        next: (res) => {
          this.steps = 3;
          this.isBtnSubmit = false;
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          console.log(err.error.message);
          this.isBtnSubmit = false;
        },
      });
    }
  };
  submitStep3 = () => {
    this.isBtnSubmit = true;
    if (this.resetPassword.valid) {
      this.authService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.steps = 3;
          this.isBtnSubmit = false;
          localStorage.setItem('token', res.token);
          this.authService.saveUserData();
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          console.log(err.error.message);
          this.isBtnSubmit = false;
        },
      });
    }
  };
}