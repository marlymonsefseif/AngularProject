import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  adminName =  localStorage.getItem('fName');
  
  
  adminLocation = 'Admin Panel';

  constructor(private router: Router) {
    if(this.adminName==null)
    {
        this.adminName="Admin Name";
    }
  }


  logout() {
    localStorage.removeItem('AdminAuthToken');
    localStorage.removeItem('AdminId');
    this.router.navigate(['/login']);
  }
} 