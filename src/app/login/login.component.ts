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
        

        // Stocker le token si nécessaire
        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        // Redirection vers la page d'accueil
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
        alert(this.errorMessage);
      },
    });
  }

  // Méthode d'inscription
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
          alert('Signup successful! You can now log in.');
          this.toggleMode(true); // Basculer vers l'écran de login
        },
        error: (error) => {
          console.error('Signup error:', error);
          this.errorMessage = 'Signup failed. Please try again.'; // Affichage d'un message d'erreur
          alert(this.errorMessage);
        },
      });
  }
}
