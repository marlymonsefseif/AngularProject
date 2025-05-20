import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './URLservice';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = `${API_URL}gallery`;

  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
} 