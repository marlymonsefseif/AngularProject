import { Membership } from '../models/membership';
import { Injectable } from '@angular/core';
import { API_URL } from './URLservice';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberShipServiceService {

   private apiUrl = `${API_URL}MembershipPlans`; 
    constructor(private http: HttpClient) { }


    getMemberShips(): Observable<Membership[]> {
     return  this.http.get<Membership[]>(this.apiUrl);
  }
  

}
