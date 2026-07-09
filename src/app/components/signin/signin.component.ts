import { Component, inject } from '@angular/core';
import { AlertComponent } from '../../shared/ui/alert/alert.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { signupValidators } from '../../shared/validators/signupValidator';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AlertComponent, ReactiveFormsModule , RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
 errorMessage: string = '';
  isBtnSubmit: boolean = false;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl(null, signupValidators.email),
    password: new FormControl(null, signupValidators.password),
  });
  sendData = () => {
    this.isBtnSubmit = true;
    if (this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            console.log(res);
            localStorage.setItem('token', res.token);
            this.authService.saveUserData();
            this.router.navigate(['/home']);
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
