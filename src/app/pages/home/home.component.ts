import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userId:any = localStorage.getItem("UserId");
  token : any = localStorage.getItem("UserAuthToken");

  constructor(private userService:UserService, private router:Router){}

  getuser() {
    if (this.token) {
      this.userService.getUser(this.userId).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate([`/profile/${this.userId}`]);
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      alert("No token found in localStorage");
    }
  }
}
