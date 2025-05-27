import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from './URLservice';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseurl = `${API_URL}Booking`;
  private adminToken = localStorage.getItem("AdminAuthToken");

  constructor(private http: HttpClient) { }

  getConfirmedBookings() : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    });
    return this.http.get<any>(`${this.baseurl}/GetConfirmed`, {headers});
  }

  getPendingBookings() : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    });
    return this.http.get<any>(`${this.baseurl}/GetPending`, {headers});
  }

  getCancelledBookings() : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    });
    return this.http.get<any>(`${this.baseurl}/GetCancelled`, {headers});
  }

  removeBooking(id:any) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    });
    return this.http.delete<any>(`${this.baseurl}/${id}`, {headers});
  }
}