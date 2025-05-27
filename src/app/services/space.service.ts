import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Space, SpaceDTO } from '../models/space.model';
import { API_URL } from './URLservice';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  private apiUrl = `${API_URL}spaces`;

  constructor(private http: HttpClient) { }

  getSpaces(): Observable<Space[]> {
    return this.http.get<Space[]>(this.apiUrl);
  }

  getById(id: string | null): Observable<Space> {
    return this.http.get<Space>(`${this.apiUrl}/${id}`);
  }

  addSpace(spaceDto: SpaceDTO): Observable<any> {
    const token = localStorage.getItem("AdminAuthToken");
    // if(token!= null)
    // {
    //   console.log("not authorize");
    //   return throwError(() => 'Not authorized');
    // }
    // else
    // {
    //   const headers = new HttpHeaders({
    //     'Authorization': `Bearer ${token}`
    //   });
    //   return this.http.post<any>(`${this.apiUrl}`, spaceDto, { headers })
    //   .pipe(
    //     map(response => {
    //       return {
    //         status: 201,
    //         data: response
    //       };
    //     }),
    //     catchError(this.handleError)
    //   );
    // }
    if (token == null) {
      console.log("not authorized");
      return throwError(() => 'Not authorized');
    } else {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post<any>(`${this.apiUrl}`, spaceDto, { headers })
        .pipe(
          map(response => {
            return {
              status: 201,
              data: response
            };
          }),
          catchError(this.handleError)
        );
    }


  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
