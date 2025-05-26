import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { IUserData } from '../../models/iuser-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users : IUserData[] = [];
  constructor(private userService:UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      }
    });
  }

}
