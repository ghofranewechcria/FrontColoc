// // user.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'http://localhost:8082/api/users/profile'; // URL de l'API pour récupérer le profil

//   constructor(private http: HttpClient) {}

//   // Méthode pour récupérer le profil utilisateur
//   getUserProfile(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }
// }
