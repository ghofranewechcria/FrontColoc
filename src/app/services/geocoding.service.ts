import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  // Méthode pour géocoder une adresse
  getCoordinates(address: string): Observable<any> {
    return this.http.get(this.nominatimUrl, {
      params: {
        q: address,
        format: 'json',
        addressdetails: '1',
        limit: '1', // Retourne uniquement la première correspondance
      },
    });
  }
}
