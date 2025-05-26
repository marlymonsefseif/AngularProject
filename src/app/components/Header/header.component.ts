import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class headerComponent implements OnInit {
  Id? : any;
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.Id = localStorage.getItem('UserId') || localStorage.getItem('AdminId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('UserAuthToken') || !!localStorage.getItem('AdminAuthToken');
  }

  isAdmin(): boolean {
    return !!localStorage.getItem('AdminAuthToken');
  }

  logout(): void {
    localStorage.removeItem('UserAuthToken');
    localStorage.removeItem('AdminAuthToken');
    localStorage.removeItem('UserId');
    localStorage.removeItem('AdminId');
    localStorage.removeItem('fName');
    this.router.navigate(['/login']);
  }
}