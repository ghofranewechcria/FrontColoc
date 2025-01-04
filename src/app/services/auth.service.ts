import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8082'; // URL du back-end

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/api/auth/authenticate`, body);
  }

  signup(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string
  ): Observable<any> {
    const body = { firstname, lastname, email, password, role };
    return this.http.post(`${this.apiUrl}/api/auth/register`, body);
  }

  getUserProfile(): Observable<any> {
    // Récupérer le token d'authentification du stockage local ou du cookie
    const token = localStorage.getItem('jwt_token');
    console.log('this is the user token' , token)

    // Ajouter le token dans les en-têtes de la requête
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/api/users/profile`, { headers });
  }

  completeUserProfile(
    userProfile: any,
    photoFile: File | null
  ): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const formData = new FormData();

    // Ajouter les champs non-fichiers à FormData
    Object.keys(userProfile).forEach((key) => {
      if (userProfile[key] !== null && userProfile[key] !== undefined) {
        formData.append(key, userProfile[key]);
      }
    });

    // Ajouter le fichier photo à FormData s'il existe
    if (photoFile) {
      formData.append('photo', photoFile, photoFile.name);
    }

    return this.http.put(`${this.apiUrl}/api/users/profile`, formData, {
      headers,
    });
  }

  getAvailableLogements(): Observable<any[]> {
    const token = localStorage.getItem('jwt_token');
    console.log(localStorage.getItem('jwt_token'));

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/api/logement/available`, {
      headers,
    });
  }

  getLogementById(id: string): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/api/logement/${id}`, { headers });
  }

  ajouterColocation(logementId: number): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(
      `${this.apiUrl}/api/colocations/${logementId}`,
      null,
      { headers }
    );
  }
}
