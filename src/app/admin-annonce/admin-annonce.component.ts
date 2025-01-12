import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import { AnnonceService } from '../services/annonce.service';

@Component({
  selector: 'app-admin-annonce',
  templateUrl: './admin-annonce.component.html',
  styleUrls: ['./admin-annonce.component.css'],
})
export class AdminAnnonceComponent implements OnInit {
  logements: any[] = []; // Liste des logements à afficher

  constructor(private annonceService: AnnonceService, private router: Router) {}

  ngOnInit(): void {
    this.getLogements();
  }

  // Récupérer tous les logements
  getLogements(): void {
    this.annonceService.getAllLogements().subscribe(
      (data) => {
        this.logements = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des logements', error);
      }
    );
  }

  // Supprimer un logement
  deleteLogement(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce logement ?')) {
      this.annonceService.deleteLogement(id).subscribe(
        () => {
          this.logements = this.logements.filter((logement) => logement.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression du logement', error);
        }
      );
    }
  }
}
