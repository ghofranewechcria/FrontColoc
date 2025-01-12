// colocation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColocationService {
  private apiUrl = 'http://localhost:8082/api'; // URL du back-end

  constructor(private http: HttpClient) {}

  getHistoriqueColocations(): Observable<any> {
    // Récupération du token JWT depuis le local storage
    const token = localStorage.getItem('jwt_token');
    console.log('JWT Token:', token);

    // Ajout du token dans les en-têtes de la requête
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Appel de l'endpoint pour récupérer l'historique des colocations
    return this.http.get<any>(`${this.apiUrl}/colocations/historique`, {
      headers,
    });
  }

  annulerColocation(id: number): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      console.log('Token non trouvé');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Envoi de la requête PUT pour annuler la colocation
    return this.http.put<any>(`${this.apiUrl}/colocations/annuler/${id}`, {}, { headers });
  }
}
