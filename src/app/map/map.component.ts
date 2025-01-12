import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: L.Map | undefined;

  @Input() logements: any[] = []; // Les logements passés en entrée

  ngOnInit(): void {
    this.initMap();
    this.addMarkers();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [33.8869, 9.5375], // Centre sur la Tunisie
      zoom: 7
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private addMarkers(): void {
    if (!this.map) {
      console.error('La carte n’est pas encore initialisée.');
      return;
    }
  
    if (!this.logements) {
      console.error('Les données des logements ne sont pas disponibles.');
      return;
    }
  
    this.logements.forEach(logement => {
      if (logement.latitude && logement.longitude) {
        L.marker([logement.latitude, logement.longitude])
          .addTo(this.map as L.Map) // Force le type pour éviter l'erreur
          .bindPopup(`
            <strong>${logement.adresse}</strong><br>
            Prix: ${logement.prix} DT<br>
            Places libres: ${logement.nombrePlaceLibre}
          `);
      }
    });
  }
  
  
}
