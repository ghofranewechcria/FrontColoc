import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
  userProfile: any = null;
  errorMessage: string = '';
  updateprofile: boolean = false;

  private apiUrl = 'http://localhost:8082/api/users'; // Remplacez par l'URL de votre backend

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.authService.getUserProfile().subscribe({
      next: (response) => {
        this.userProfile = response;
      },
      error: (error) => {
        this.errorMessage = 'Impossible de récupérer les informations du profil.';
        console.error(error);
      },
    });
  }

  onCompleteProfile(): void {
    this.authService.completeUserProfile(this.userProfile).subscribe({
      next: (response) => {
        alert('Profil mis à jour avec succès !');
        this.userProfile = response; // Met à jour le profil utilisateur localement
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du profil :', error);
        alert('Une erreur est survenue lors de la mise à jour du profil.');
      },
    });
  }
  
}
