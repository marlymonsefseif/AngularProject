

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './URLservice';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = 'http://localhost:17102/api/Payment';    
  constructor(private http: HttpClient) {}

  createPaymentIntent(paymentRequest: any) {
    return this.http.post<any>(`${this.baseUrl}/create-payment-intent`, paymentRequest);
  }
}
