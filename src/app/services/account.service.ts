import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisteruser } from '../models/iregisteruser';
import { ILoginuser } from '../models/iloginuser';
import { API_URL } from './URLservice';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseurl = `${API_URL}Account`;
  
  constructor(private http : HttpClient) { }

  registerUser(user:any) : Observable<any> {
    return this.http.post<IRegisteruser>(`${this.baseurl}/Register`,user);
  }

  loginUser(user:any) : Observable<any> {
    return this.http.post<ILoginuser>(`${this.baseurl}/Login`,user);
  }
  
}
