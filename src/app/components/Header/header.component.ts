import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userToken: any = localStorage.getItem("UserAuthToken");
  adminToken: any = localStorage.getItem("AdminAuthToken");
  userId: any = localStorage.getItem("UserId");
}
