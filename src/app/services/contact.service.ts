import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact';
import { API_URL } from './URLservice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${API_URL}ContactMessage`;
  constructor(private http: HttpClient) { }

  sendMessage(message: Contact) {
    return this.http.post(this.apiUrl, message);
  }
  getMessage() : Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}