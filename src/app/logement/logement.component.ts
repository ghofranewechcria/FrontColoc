import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logement',
  templateUrl: './logement.component.html',
  styleUrls: ['./logement.component.css']
})
export class LogementComponent {

  logementForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public router: Router // Assurez-vous que router est public pour y accéder dans le template
  ) {
    // Initialisation du formulaire
    this.logementForm = this.fb.group({
      adresse: ['', Validators.required], // Le champ adresse est requis
      prix: ['', [Validators.required, Validators.min(0)]], // Le prix est requis et doit être >= 0
      description: ['', Validators.required], // La description est requise
      equipDispo: ['', Validators.required], // Equipement disponible est requis
      dateDisponibilite: ['', Validators.required], // Date de disponibilité est requise
      nombrePlaceLibre: ['', [Validators.required, Validators.min(1)]], // Nombre de places libres est requis et doit être >= 1
      disponible: [true, Validators.required], // Le champ disponible est requis
    });
  }

  // Méthode pour gérer le changement de fichiers
  onFileChange(event: any): void {
    if (event.target.files) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  // Méthode de soumission du formulaire
  submitForm(): void {
    if (this.logementForm.invalid) {
      this.logementForm.markAllAsTouched(); // Marquer tous les champs comme touchés pour afficher les erreurs
      alert('Veuillez remplir tous les champs requis correctement.');
      return;
    }

    const formData = new FormData();
    const logementData = this.logementForm.value;

    // Formater la date pour correspondre au format attendu par le backend
    const formattedDate = new Date(logementData.dateDisponibilite).toISOString();

    // Ajouter les données du formulaire au FormData
    formData.append('adresse', logementData.adresse);
    formData.append('prix', logementData.prix);
    formData.append('description', logementData.description);
    formData.append('equipDispo', logementData.equipDispo);
    formData.append('dateDisponibilite', formattedDate);
    formData.append('nombrePlaceLibre', logementData.nombrePlaceLibre);
    formData.append('disponible', logementData.disponible);

    // Ajouter les fichiers sélectionnés
    this.selectedFiles.forEach((file) => {
      formData.append('photos', file);
    });

    // Récupérer le token JWT dans le localStorage
    const token = localStorage.getItem('jwt_token'); 

    // Vérifier si le token existe
    if (!token) {
      alert('Token d\'authentification manquant. Veuillez vous connecter.');
      this.router.navigate(['/login']);
      return;
    }

    // Ajouter le token dans l'en-tête Authorization
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,  // Ajouter le token dans l'en-tête Authorization
    });

    // Envoi de la requête HTTP POST
    this.http.post('http://localhost:8082/api/logement/new-logement', formData, { headers })
      .subscribe({
        next: (response) => {
          alert('Logement créé avec succès !');
          this.router.navigate(['/logements']); // Naviguer vers la liste des logements après création
        },
        error: (err) => {
          // Gestion des erreurs HTTP
          console.error('Erreur lors de la création du logement:', err);
          if (err.status === 403) {
            alert('Accès interdit : vous n\'avez pas les permissions nécessaires.');
          } else if (err.status === 401) {
            alert('Non autorisé : veuillez vous connecter.');
          } else {
            alert('Erreur lors de la création du logement. Veuillez réessayer.');
          }
        }
      });
  }
}