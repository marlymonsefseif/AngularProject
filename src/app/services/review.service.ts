import { Injectable } from '@angular/core';
import { API_URL } from './URLservice';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReview } from '../models/ireview';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseurl = `${API_URL}Review`;

  constructor(private http:HttpClient) { }

  getReviews() : Observable<any> {
    return this.http.get<IReview>(`${this.baseurl}/UserReview`);
  }
}
