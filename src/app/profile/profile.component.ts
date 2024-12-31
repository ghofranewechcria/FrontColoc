import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile: any = null;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.authService.getUserProfile().subscribe({
      next: (response) => {
        this.userProfile = response; // Assurez-vous que la réponse contient les données nécessaires
      },
      error: (error) => {
        this.errorMessage = 'Impossible de récupérer les informations du profil.';
        console.error(error);
      },
    });
  }
}


