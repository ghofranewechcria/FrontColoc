import { Component, OnInit } from '@angular/core';
import { ColocationService } from '../services/colocation.service';

@Component({
  selector: 'app-historique-colocations',
  templateUrl: './historique-colocations.component.html',
  styleUrls: ['./historique-colocations.component.css'],
})
export class ColocationHistoriqueComponent implements OnInit {
  colocationsActuelles: any[] = []; // Stocker les colocations actives
  colocationsHistorique: any[] = []; // Stocker l'historique des colocations
  errorMessage: string = '';

  constructor(private colocationService: ColocationService) {}

  ngOnInit(): void {
    this.getHistoriqueColocations();
  }

  getHistoriqueColocations(): void {
    this.colocationService.getHistoriqueColocations().subscribe(
      (response) => {
        console.log('Réponse API:', response);
        if (response && response.data) {
          console.log('Colocations:', response.data);

          this.colocationsActuelles = response.data
            .filter((colocation: any) => colocation.active)
            .map((colocation: any) => {
              console.log('Colocation:', colocation);
              return {
                id: colocation.id,
                logementId: colocation.logementId,
                logementDescription:
                  colocation.logementDetails?.description || 'Non renseignée',
                logementPrix:
                  colocation.logementDetails?.prix || 'Non renseigné',
                active: colocation.active,
                colocataires: colocation.colocataires || [],
              };
            });

          this.colocationsHistorique = response.data
            .filter((colocation: any) => !colocation.active)
            .map((colocation: any) => ({
              id: colocation.id,
              logementDescription:
                colocation.logementDetails?.description || 'Non renseignée',
              logementPrix: colocation.logementDetails?.prix || 'Non renseigné',
              active: colocation.active,
              colocataires: colocation.colocataires || [],
            }));

          console.log('Colocations Actuelles:', this.colocationsActuelles);
          console.log('Colocations Historique:', this.colocationsHistorique);
        } else {
          this.colocationsActuelles = [];
          this.colocationsHistorique = [];
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        this.errorMessage = 'Erreur lors de la récupération des données.';
      }
    );
  }

  annulerColocation(colocation: any): void {
    const logementId = colocation.logementId;

    if (logementId) {
      console.log("Tentative d'annulation pour logementId:", logementId);

      this.colocationService.annulerColocation(logementId).subscribe({
        next: (response) => {
          console.log("Réponse de l'annulation:", response);

          this.getHistoriqueColocations();

          this.errorMessage = '';
        },
        error: (error) => {
          console.error("Erreur lors de l'annulation de la colocation:", error);

          if (error.status === 200 || error.ok) {
            console.warn("L'annulation semble avoir réussi malgré l'erreur.");
            this.getHistoriqueColocations();
          } else {
            this.errorMessage = "Erreur lors de l'annulation de la colocation.";
          }
        },
      });
    } else {
      console.error('logementId est invalide');
    }
  }
}
