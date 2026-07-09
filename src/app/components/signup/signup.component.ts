import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { signupValidators } from '../../shared/validators/signupValidator';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { confirmPassword } from '../../shared/utils/confirm-password.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { AlertComponent } from '../../shared/ui/alert/alert.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
 errorMessage: string = '';
  isBtnSubmit: boolean = false;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  register = new FormGroup(
    {
      name: new FormControl(null, signupValidators.name),
      email: new FormControl(null, signupValidators.email),
      password: new FormControl(null, signupValidators.password),
      rePassword: new FormControl(null, signupValidators.rePassword),
    },
    confirmPassword,
  );
  sendData = () => {
    this.isBtnSubmit = true;
    if (this.register.valid) {
      this.authService.signup(this.register.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.router.navigate(['/signin']); 
            this.isBtnSubmit = false;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.isBtnSubmit = false;
          this.errorMessage = err.error.message;
        },
      });
    }
  };
}
