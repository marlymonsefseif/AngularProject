import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './URLservice';
import { IUserData } from '../models/iuser-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseurl = `${API_URL}User`;
  private userToken = localStorage.getItem("UserAuthToken");
  private adminToken = localStorage.getItem("AdminAuthToken");

  constructor(private http: HttpClient) { }

  private getToken(): string {
    return this.adminToken || this.userToken || '';
  }

  getUser(id?: any): Observable<IUserData> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get<IUserData>(`${this.baseurl}/${id}`, { headers });
  }

  editUser(id: any, user: any) : Observable<IUserData> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.put<IUserData>(`${this.baseurl}/${id}`, user, { headers });
  }

  getAllUsers() : Observable<IUserData[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    });

    return this.http.get<IUserData[]>(this.baseurl, {headers});
  }

  deleteUser(id?:any) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    });

    return this.http.delete(`${this.baseurl}/${id}`, {headers});
  }
}
