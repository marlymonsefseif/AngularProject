import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { API_URL } from './URLservice';
import { Gallery } from '../models/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = `${API_URL}gallery`;

  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData): Observable<any> {
    const token = localStorage.getItem("AdminAuthToken");
    if (token == null) {
      console.log("not authorized");
      return throwError(() => 'Not authorized');
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, formData, {headers});
  }

  getAll(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl);
  }

  getBySpace(spaceId: number): Observable<Gallery> {
    return this.http.get<Gallery>(`${this.apiUrl}/space/${spaceId}`);
  }
}
