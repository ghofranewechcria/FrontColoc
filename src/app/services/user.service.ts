import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8082/api/users'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) {}

  
  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('jwt_token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/get-all`, { headers });
  }
}
