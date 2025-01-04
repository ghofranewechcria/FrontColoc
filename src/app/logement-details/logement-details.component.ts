import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logement-details',
  templateUrl: './logement-details.component.html',
  styleUrls: ['./logement-details.component.css'],
})
export class LogementDetailsComponent implements OnInit {
  logement: any; // Ce devrait être un objet logement et non un tableau
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const logementId = this.route.snapshot.paramMap.get('id');
    if (logementId) {
      this.authService.getLogementById(logementId).subscribe({
        next: (data) => {
          this.logement = data;
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors du chargement des détails du logement.';
          console.error(err);
        },
      });
    }
  }

  reserver(): void {
    if (this.logement && this.logement.id) {
      this.authService.ajouterColocation(this.logement.id).subscribe({
        next: (response) => {
          alert('Colocation réservée avec succès!');
        },
        error: (err) => {
          alert('Une erreur est survenue lors de la réservation.');
          console.error(err);
        }
      });
    } else {
      alert('Logement non trouvé.');
    }
  }
}