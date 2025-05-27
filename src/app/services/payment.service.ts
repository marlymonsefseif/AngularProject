// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PaymentService {

//   constructor() { }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './URLservice';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  //private baseUrl = 'http://localhost:17102/api/Payment'; // عدّلي الرابط حسب الباك الخاص بك
   private apiUrl = `${API_URL}Payment`;
 
  constructor(private http: HttpClient) {}

  createPaymentIntent(paymentRequest: any) {
    return this.http.post<any>(`${this.apiUrl}/create-payment-intent`, paymentRequest);
  }
}
