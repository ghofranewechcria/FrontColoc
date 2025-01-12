import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoginMode = true;
  email = '';
  password = '';
  firstname = '';
  lastname = '';
  role = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode(mode: boolean) {
    this.isLoginMode = mode;
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        if (response.token) {
          localStorage.setItem('jwt_token', response.token);
        }

        if (response.userRole) {
          localStorage.setItem('user', JSON.stringify({ role: response.userRole }));
      }

        this.router.navigate(['/logements']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
        alert(this.errorMessage);
      },
    });
  }



  onSignup() {
    this.authService
      .signup(
        this.firstname,
        this.lastname,
        this.email,
        this.password,
        this.role
      )
      .subscribe({
        next: (response) => {
          console.log('Signup successful:', response);

          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          alert('Signup successful! You can now log in.');
          this.toggleMode(true); 
        },
        error: (error) => {
          console.error('Signup error:', error);
          this.errorMessage = 'Signup failed. Please try again.'; // Affichage d'un message d'erreur
          alert(this.errorMessage);
        },
      });
  }
}
