import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GeocodingService } from '../services/geocoding.service';

@Component({
  selector: 'app-logement-list',
  templateUrl: './logement-list.component.html',
  styleUrls: ['./logement-list.component.css'],
})
export class LogementListComponent implements OnInit {
  logements: any[] = [];
  filteredLogements: any[] = [];
  logementsWithCoordinates: any[] = [];
  
  errorMessage: string = '';

  // Filtres
  filterPrixRange: [number, number] = [0, 5000]; // Slider pour le prix
  filterAdresse: string = '';
  filterEquipDispo: string = '';
  equipDispos: string[] = [];
  equipSuggestions: string[] = [];

  constructor(
    private authService: AuthService,
    private geocodingService: GeocodingService
  ) {}

  ngOnInit(): void {
    this.authService.getAvailableLogements().subscribe({
      next: (data) => {
        this.logements = data;
        this.filteredLogements = [...this.logements];
        this.populateEquipDispos();

        // Géocodage des adresses
        this.logements.forEach((logement) => {
          this.geocodingService.getCoordinates(logement.adresse).subscribe({
            next: (result) => {
              if (result && result.length > 0) {
                logement.latitude = parseFloat(result[0].lat);
                logement.longitude = parseFloat(result[0].lon);
              }
            },
            error: (err) => {
              console.error(
                `Erreur de géocodage pour l'adresse ${logement.adresse}`,
                err
              );
            },
          });
        });
      },
      error: (err) => {
        this.errorMessage =
          'Erreur lors du chargement des logements disponibles.';
        console.error(err);
      },
    });
  }
  // Remplit la liste des équipements disponibles pour le filtre
  populateEquipDispos(): void {
    this.equipDispos = Array.from(
      new Set(this.logements.map((logement) => logement.equipDispo))
    );
  }

  // Recherche dynamique pour les équipements
  filterEquipements(event: any): void {
    const query = event.query.toLowerCase();
    this.equipSuggestions = this.equipDispos.filter((equip) =>
      equip.toLowerCase().includes(query)
    );
  }

  // Appliquer les filtres
  applyFilters(): void {
    this.filteredLogements = this.logements.filter((logement) => {
      const matchesPrix =
        logement.prix >= this.filterPrixRange[0] &&
        logement.prix <= this.filterPrixRange[1];
      const matchesAdresse =
        this.filterAdresse === '' ||
        logement.adresse.toLowerCase().includes(this.filterAdresse.toLowerCase());
      const matchesEquip =
        this.filterEquipDispo === '' ||
        logement.equipDispo.toLowerCase().includes(this.filterEquipDispo.toLowerCase());
  
      return matchesPrix && matchesAdresse && matchesEquip;
    });
  }
} 