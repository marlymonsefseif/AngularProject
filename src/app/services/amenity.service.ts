import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Amenity, AmenityDto } from '../models/amenity.model';
import { API_URL } from './URLservice';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {
  private apiUrl = `${API_URL}amenity`; // Update this with your actual API URL
  //private apiUrl = `http://localhost:17102/api/amenity`;
  constructor(private http: HttpClient) { }
  getAmenities(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}amenity`)
      .pipe(
        catchError(this.handleError)
      );
  }
  addAmenity(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?name=${encodeURIComponent(name)}`, {})
      .pipe(
        map(response => {
          return {
            status: 200,
            data: response
          };
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
} 