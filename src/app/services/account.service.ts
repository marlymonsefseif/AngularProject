import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisteruser } from '../models/iregisteruser';
import { ILoginuser } from '../models/iloginuser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseurl = "http://localhost:17102/api/Account"
  
  constructor(private http : HttpClient) { }

  registerUser(user:any) : Observable<any> {
    return this.http.post<IRegisteruser>(`${this.baseurl}/Register`,user);
  }

  loginUser(user:any) : Observable<any> {
    return this.http.post<ILoginuser>(`${this.baseurl}/Login`,user);
  }
  
}
