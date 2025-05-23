import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './URLservice';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseurl = `${API_URL}User`;

  constructor(private http: HttpClient) { }

  getUser(id: any): Observable<any> {
    const token = localStorage.getItem("UserAuthToken");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseurl}/${id}`, { headers });
  }

  editUser(id: any, user: any) : Observable<any> {
    const token = localStorage.getItem("UserAuthToken");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.baseurl}/${id}`, user, { headers });
  }
}
