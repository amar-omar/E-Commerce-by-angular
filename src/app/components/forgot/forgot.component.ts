import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from '../../shared/ui/alert/alert.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
})
export class ForgotComponent implements OnInit {
  steps: number = 1; // Changed from 'any' to 'number'
  errorMessage: string = '';
  isBtnSubmit: boolean = false;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  forgotPassword = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
  });

  verifyResetCode = new FormGroup({
    resetCode: new FormControl<string | null>(null, [Validators.required]),
  });
  
  resetPassword = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    newPassword: new FormControl<string | null>(null, [Validators.required]),
  });

  submitStep1 = () => {
    if (this.forgotPassword.valid) {
      const email = this.forgotPassword.get('email')?.value;
      if (email) {
        this.resetPassword.get('email')?.setValue(email);
      }
      this.isBtnSubmit = true;

      this.authService.forgotPasswords(this.forgotPassword.value).subscribe({
        next: (res) => {
          this.steps = 2;
          localStorage.setItem('currentSteps', this.steps.toString());
          if (email) {
            localStorage.setItem('currentEmail', email);
          }
          this.isBtnSubmit = false;
          this.errorMessage = ''; // Clear any previous errors
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'An error occurred';
          console.log(this.errorMessage);
          this.isBtnSubmit = false;
        },
      });
    }
  };
  
  submitStep2 = () => {
    if (this.verifyResetCode.valid) {
      this.isBtnSubmit = true;
      this.authService.verifyResetCode(this.verifyResetCode.value).subscribe({
        next: (res) => {
          this.steps = 3;
          localStorage.setItem('currentSteps', this.steps.toString());
          this.isBtnSubmit = false;
          this.errorMessage = ''; // Clear any previous errors
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Invalid reset code';
          console.log(this.errorMessage);
          this.isBtnSubmit = false;
        },
      });
    }
  };
  
  submitStep3 = () => {
    if (this.resetPassword.valid) {
      this.isBtnSubmit = true;
      this.authService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.isBtnSubmit = false;
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.authService.saveUserData();
            // Clear password reset session data
            localStorage.removeItem('currentSteps');
            localStorage.removeItem('currentEmail');
            this.router.navigate(['/home']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Failed to reset password';
          console.log(this.errorMessage);
          this.isBtnSubmit = false;
        },
      });
    }
  };
  
  ngOnInit(): void {
    // Parse localStorage values correctly
    const savedStep = localStorage.getItem('currentSteps');
    this.steps = savedStep ? parseInt(savedStep, 10) : 1;
    
    const savedEmail = localStorage.getItem('currentEmail');
    if (savedEmail && this.resetPassword.get('email')) {
      this.resetPassword.get('email')?.setValue(savedEmail);
    }
  }
}