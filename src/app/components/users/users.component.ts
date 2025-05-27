import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { IUserData } from '../../models/iuser-data';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: IUserData[] = [];
  isLoading: boolean = true; 
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.isLoading = false; 
      },
      error: () => {
        this.isLoading = false; 
      }
    });
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        console.log(response.message);
      }
    })
  }
}
