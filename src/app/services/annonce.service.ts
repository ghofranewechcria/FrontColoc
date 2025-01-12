import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  private apiUrl = 'http://localhost:8082/api/logement'; // URL de ton API pour récupérer les logements disponibles

  constructor(private http: HttpClient) {}

  getAllLogements(): Observable<any[]> {
    const token = localStorage.getItem('jwt_token'); // Récupérer le token du localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers });
  }

  deleteLogement(id: number): Observable<void> {
    const token = localStorage.getItem('jwt_token'); // Récupérer le token du localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getLogementsByOwner(): Observable<any[]> {
    const token = localStorage.getItem('jwt_token'); // Récupérer le token du localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/by-owner`, { headers });
  }
  
}
