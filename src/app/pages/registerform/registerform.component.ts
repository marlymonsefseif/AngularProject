import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registerform',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent {

  constructor(private accountService: AccountService, private router: Router) { }

  userData = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('',Validators.maxLength(11)),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
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

  get getPass() {
    return this.userData.controls['password'];
  }

  get getCPass() {
    return this.userData.controls['confirmPassword'];
  }

  registerOperation() {
    if (this.userData.status == "VALID") {
      console.log(this.userData.value);
      this.accountService.registerUser(this.userData.value).subscribe({
        next: (response) => {
          alert(response.message);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else {
      alert("Check Errors and Fix It.");
    }
  }
}
