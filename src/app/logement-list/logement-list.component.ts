import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logement-list',
  templateUrl: './logement-list.component.html',
  styleUrls: ['./logement-list.component.css'],
})
export class LogementListComponent implements OnInit {
  logements: any[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAvailableLogements().subscribe({
      next: (data) => {
        this.logements = data.map(logement => ({
          ...logement,
          proprietaire: {
            firstname: logement.proprietaire.firstname,
            lastname: logement.proprietaire.lastname
          },
          photoUrls: logement.photoUrls
        }));
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des logements disponibles.';
        console.error(err);
      },
    });
  }
}
