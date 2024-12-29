import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstname = '';
  lastname = '';
  email = '';
  password = '';
  role: string = 'COLOCATAIRE'; // Valeur par défaut : Colocataire

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSignup() {
    // Envoie du formulaire avec les données et le rôle choisi
    this.authService.signup(this.firstname, this.lastname, this.email, this.password, this.role).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        this.successMessage = 'Signup successful! You can now log in.';
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Signup error:', error);
        this.errorMessage = 'Signup failed. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
