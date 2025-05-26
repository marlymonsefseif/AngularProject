import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard block p-4">
      <h5>Admin Dashboard</h5>
      <div class="row p-2">
        <div class="col-md-4">
          <div class="dashboard-card">
            <i class="fa-solid fa-building"></i>
            <h3>Spaces</h3>
            <p>Manage your spaces</p>
            <a routerLink="/admin-dashboard/add-space" class="btn btn-primary">Add Space</a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="dashboard-card">
            <i class="fa-solid fa-list-check"></i>
            <h3>Amenities</h3>
            <p>Manage amenities</p>
            <a routerLink="/admin-dashboard/add-amenity" class="btn btn-primary">Add Amenity</a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="dashboard-card">
            <i class="fa-solid fa-images"></i>
            <h3>Gallery</h3>
            <p>Manage gallery</p>
            <a routerLink="/admin-dashboard/add-gallery" class="btn btn-primary">Add Gallery</a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="dashboard-card">
            <i class="fa-solid fa-images"></i>
            <h3>Users</h3>
            <p>Manage users</p>
            <a routerLink="/admin-dashboard/add-gallery" class="btn btn-primary">All Users</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      margin-bottom: 20px;
      transition: transform 0.3s ease;
    }

    .dashboard-card:hover {
      transform: translateY(-5px);
    }

    .dashboard-card i {
      font-size: 2.5rem;
      color: #007bff;
      margin-bottom: 15px;
    }

    .dashboard-card h3 {
      font-size: 1.5rem;
      margin: 10px 0;
      color: #333;
    }

    .dashboard-card p {
      color: #666;
      margin-bottom: 15px;
    }

    .btn-primary {
      background: #007bff;
      color: white;
      padding: 8px 20px;
      border-radius: 5px;
      text-decoration: none;
      transition: background 0.3s ease;
    }

    .btn-primary:hover {
      background: #0056b3;
      color: white;
    }
  `]
})
export class DashboardHomeComponent {} 