import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl = "http://localhost:17102/api/User";

  constructor(private http: HttpClient) { }

  getUser(id: any): Observable<any> {
    const token = localStorage.getItem("UserAuthToken");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`http://localhost:17102/api/User/${id}`, { headers });
  }
}
