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
  updateProfile: boolean = false;
  selectedPhoto: File | null = null;
  photoFileValid: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.authService.getUserProfile().subscribe({
      next: (response) => {
        this.userProfile = response;
        console.log('Profil utilisateur récupéré:', response);
      },
      error: (error) => {
        this.errorMessage = 'Impossible de récupérer le profil utilisateur.';
        console.error(error);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photoFileValid = true;
    } else {
      this.photoFileValid = false;
    }
  }

  onSubmit(): void {
    if (!this.photoFileValid) {
      alert('Profile photo is required!');
      return;
    }

    if (!this.userProfile) return;

    // Prépare les données du profil sans la photo
    const userProfileData = {
      numTel: this.userProfile.num_tel,
      budget: this.userProfile.budget,
      typelogementprefere: this.userProfile.typelogementprefere,
      localisationprefere: this.userProfile.localisationprefere,
    };

    console.log(userProfileData);
    // Appel du service en passant à la fois les données du profil et la photo si elle est sélectionnée
    this.authService
      .completeUserProfile(userProfileData, this.selectedPhoto)
      .subscribe({
        next: (response) => {
          alert('Profil mis à jour avec succès !');
          this.updateProfile = false;
          this.getUserProfile(); // Recharger le profil après la mise à jour
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du profil :', error);
          alert('Une erreur est survenue lors de la mise à jour du profil.');
        },
      });
  }

  getUserImageSrc(base64Image: string): string {
    if (!base64Image) {
      return ''; // Retourne une valeur vide si l'image est null ou indéfinie
    }

    // Détection du type MIME en fonction du contenu ou de la logique associée
    if (base64Image.startsWith('/9j/')) {
      return 'data:image/jpeg;base64,' + base64Image;
    } else if (base64Image.startsWith('iVBORw0KGgo=')) {
      return 'data:image/png;base64,' + base64Image;
    } else if (base64Image.startsWith('R0lGODlh')) {
      return 'data:image/gif;base64,' + base64Image;
    } else {
      // Par défaut, considérer comme un JPEG si aucune détection spécifique
      return 'data:image/jpeg;base64,' + base64Image;
    }
  }
}
