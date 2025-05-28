

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './URLservice';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = `${API_URL}Payment`;   
  private userToken = localStorage.getItem("UserAuthToken"); 
  constructor(private http: HttpClient) {}

  createPaymentIntent(paymentRequest: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });


    return this.http.post<any>(`${this.baseUrl}/create-payment-intent`, paymentRequest, {headers});
  }
}
