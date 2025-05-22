import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact';
import { API_URL } from './URLservice';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${API_URL}ContactMessage`;
  messages:any;
  constructor(private http: HttpClient) { }

  sendMessage(message: Contact) {
    return this.http.post(this.apiUrl, message);
  }
  getMessage(){
    this.messages= this.http.get(this.apiUrl);
  }
}