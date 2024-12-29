import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    role : string
  ): Observable<any> {
    const body = { firstname, lastname, email, password, role };
    return this.http.post(`${this.apiUrl}/api/auth/register`, body);
  }
}
