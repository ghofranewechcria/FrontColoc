import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    // Vérifier que les mots de passe correspondent
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    // Construire la requête pour le backend
    const registerRequest = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
    };

    // Envoyer la requête HTTP au backend
    this.http.post('http://localhost:8082/api/auth/register', registerRequest).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.router.navigate(['/login']); // Rediriger vers la page de connexion
      },
      error: (error) => {
        console.error('Erreur lors de l’inscription', error);
        this.errorMessage = 'Une erreur s’est produite lors de l’inscription. Veuillez réessayer.';
      },
    });
  }
}
