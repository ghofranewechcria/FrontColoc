import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Liste des utilisateurs
  filters: any = {}; // Object pour stocker les valeurs des filtres
  globalFilter: string = ''; // Filtre global

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response) => {
        if (response.message === 'Utilisateurs récupérés avec succès') {
          this.users = response.data.filter((user: any) => user.role === 'COLOCATAIRE');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  filteredUsers(): any[] {
    return this.users.filter(user => {
      return (
        (this.filters.firstname ? (user.firstname && user.firstname.toLowerCase().includes(this.filters.firstname.toLowerCase())) : true) &&
        (this.filters.lastname ? (user.lastname && user.lastname.toLowerCase().includes(this.filters.lastname.toLowerCase())) : true) &&
        (this.filters.email ? (user.email && user.email.toLowerCase().includes(this.filters.email.toLowerCase())) : true) &&
        (this.filters.numTel ? (user.numTel && user.numTel.toString().toLowerCase().includes(this.filters.numTel.toLowerCase())) : true) &&
        (this.filters.budget ? (user.budget && user.budget.toString().toLowerCase().includes(this.filters.budget.toLowerCase())) : true) &&
        (this.filters.typelogementprefere ? (user.typelogementprefere && user.typelogementprefere.toLowerCase().includes(this.filters.typelogementprefere.toLowerCase())) : true) &&
        (this.filters.localisationprefere ? (user.localisationprefere && user.localisationprefere.toLowerCase().includes(this.filters.localisationprefere.toLowerCase())) : true) &&
        (this.filters.age ? (user.age && user.age.toString().toLowerCase().includes(this.filters.age.toLowerCase())) : true) &&
        (this.filters.sexe ? (user.sexe && user.sexe.toLowerCase().includes(this.filters.sexe.toLowerCase())) : true) &&
        (this.filters.fumeur ? (user.fumeur && user.fumeur.toString().toLowerCase().includes(this.filters.fumeur.toLowerCase())) : true) &&
        (this.filters.animauxAcceptes ? (user.animauxAcceptes && user.animauxAcceptes.toString().toLowerCase().includes(this.filters.animauxAcceptes.toLowerCase())) : true) &&
        (this.globalFilter ? 
          (user.firstname && user.firstname.toLowerCase().includes(this.globalFilter.toLowerCase())) ||
          (user.lastname && user.lastname.toLowerCase().includes(this.globalFilter.toLowerCase())) ||
          (user.email && user.email.toLowerCase().includes(this.globalFilter.toLowerCase())) ||
          (user.numTel && user.numTel.toString().toLowerCase().includes(this.globalFilter.toLowerCase())) ||
          (user.budget && user.budget.toString().toLowerCase().includes(this.globalFilter.toLowerCase())) ||
          (user.typelogementprefere && user.typelogementprefere.toLowerCase().includes(this.globalFilter.toLowerCase())) ||
          (user.localisationprefere && user.localisationprefere.toLowerCase().includes(this.globalFilter.toLowerCase())) ||
          (user.age && user.age.toString().toLowerCase().includes(this.globalFilter.toLowerCase())) ||
          (user.sexe && user.sexe.toLowerCase().includes(this.globalFilter.toLowerCase())) ||
          (user.fumeur && user.fumeur.toString().toLowerCase().includes(this.globalFilter.toLowerCase())) ||
          (user.animauxAcceptes && user.animauxAcceptes.toString().toLowerCase().includes(this.globalFilter.toLowerCase())) : true)
      );
    });
  }
  
}