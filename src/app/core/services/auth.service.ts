import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { baseUrl } from '../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}
  private readonly router = inject(Router);

  signup = (user: any): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signup', user);
  };
  signin = (user: any): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signin', user);
  };
  saveUserData = () => {
    
    let token = localStorage.getItem('token');
    if (token) {
      try {
        let decoded = jwtDecode(token);
        console.log(decoded);
      } catch (error) {
        this.router.navigate(['signin']);
        localStorage.clear();
      }
    }
  };
   logout(): void {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.clear();
    
    // Navigate to signin page
    this.router.navigate(['/signin']);
  }
  forgotPasswords = (email: any): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/forgotPasswords', email);
  };
  
  verifyResetCode = (code: any): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/verifyResetCode', code);
  };
  
  resetPassword = (newPassword: any): Observable<any> => {
    return this._HttpClient.put(baseUrl + 'api/v1/auth/resetPassword', newPassword);
  };


















}
