import { Component } from '@angular/core';
import { AuthNavbarComponent } from "../../components/auth-navbar/auth-navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthNavbarComponent, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
    signup(value: Partial<{ name: null; email: null; password: null; rePassword: null; }>) {
    throw new Error('Method not implemented.');
  }


}
