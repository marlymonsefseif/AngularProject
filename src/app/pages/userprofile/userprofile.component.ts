import { UserService } from './../../services/user.service';
import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  imports: [],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {
  UserId: any = 0;
  user : any = {};
  token : any = localStorage.getItem("UserAuthToken");

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.UserId = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUser(this.UserId).subscribe({
        next: (response) => {
          this.user = response;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  getUser() {

  }
}
