import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from '../services/annonce.service';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css'],
})
export class AnnoncesComponent implements OnInit {
  logements: any[] = []; // Liste des logements à afficher
  filteredLogements: any[] = []; // Liste des logements filtrés
  filters: any = { id: '', adresse: '', prix: '', description: '' }; // Filtrage par colonne

  constructor(private annonceService: AnnonceService, private router: Router) {}

  ngOnInit(): void {
    this.getLogementsByOwner();
  }

  // Récupérer les logements de l'utilisateur connecté
  getLogementsByOwner(): void {
    this.annonceService.getLogementsByOwner().subscribe(
      (data) => {
        this.logements = data;
        this.filteredLogements = data; // Initialisation des logements filtrés
      },
      (error) => {
        console.error('Erreur lors de la récupération des logements par propriétaire', error);
      }
    );
  }

  // Supprimer un logement
  deleteLogement(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce logement ?')) {
      this.annonceService.deleteLogement(id).subscribe(
        () => {
          this.logements = this.logements.filter((logement) => logement.id !== id);
          this.applyFilter(); // Reapplique le filtre après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du logement', error);
        }
      );
    }
  }
  // Appliquer le filtrage
  applyFilter(): void {
    this.filteredLogements = this.logements.filter((logement) => {
      return (
        (this.filters.id ? logement.id.toString().includes(this.filters.id) : true) &&
        (this.filters.adresse ? logement.adresse.toLowerCase().includes(this.filters.adresse.toLowerCase()) : true) &&
        (this.filters.prix ? logement.prix.toString().includes(this.filters.prix) : true) &&
        (this.filters.description ? logement.description.toLowerCase().includes(this.filters.description.toLowerCase()) : true)
      );
    });
  
  }

 
}
