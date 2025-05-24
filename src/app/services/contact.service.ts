import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/contact';
import { API_URL } from './URLservice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${API_URL}ContactMessage`;
  private userToken = localStorage.getItem("UserAuthToken");
  constructor(private http: HttpClient) { }

  sendMessage(message: Contact) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });

    return this.http.post(this.apiUrl, message, {headers});
  }
  getMessage() : Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}