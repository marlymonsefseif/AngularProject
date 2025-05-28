import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  imports: [ReactiveFormsModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {
  UserId: any = 0;
  user: any = {};
  
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.UserId = localStorage.getItem("UserId") || localStorage.getItem("AdminId");

    this.userService.getUser(this.UserId).subscribe({
      next: (response) => {
        this.user = response;
        this.userData.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
          img: this.user.profileImg
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  userData = new FormGroup({
    firstName: new FormControl('', Validators.minLength(3)),
    lastName: new FormControl('', Validators.minLength(3)),
    email: new FormControl('', Validators.email),
    phoneNumber: new FormControl('', Validators.maxLength(11)),
    img: new FormControl(),
    oldPassword: new FormControl(''),
    newPassword: new FormControl('')
  });

  get getFName() {
    return this.userData.controls['firstName'];
  }

  get getLName() {
    return this.userData.controls['lastName'];
  }

  get getEmail() {
    return this.userData.controls['email'];
  }

  get getPhoneNumber() {
    return this.userData.controls['phoneNumber'];
  }

  get getProfileImg() {
    return this.userData.controls['img'];
  }

  get getOldPass() {
    return this.userData.controls['oldPassword'];
  }

  get getNewPass() {
    return this.userData.controls['newPassword'];
  }

  saveEdit() {
    if (this.userData.status == "VALID") {
      console.log(this.userData.value);
      this.userService.editUser(this.UserId, this.userData.value).subscribe({
        next: () => {
          this.user = this.userData.value;
        }
      });
    }
    else {
      alert("Check Errors and Fix It.");
    }
  }

}
