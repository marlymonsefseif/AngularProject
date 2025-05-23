import { AccountService } from './../../services/account.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-loginform',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {

  constructor(private accountService: AccountService, private router: Router) { }

  userData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false)
  });

  get getEmail() {
    return this.userData.controls['email'];
  }

  get getPassword() {
    return this.userData.controls['password'];
  }

  get getRememberMe() {
    return this.userData.controls['rememberMe'];
  }

  loginOperation() {
    if (this.userData.status == "VALID") {
      console.log(this.userData.value);
      this.accountService.loginUser(this.userData.value).subscribe({
        next: (response) => {
          alert('Login success');
          if (this.userData.value.email?.toLocaleLowerCase() == "admin@gmail.com") {
            localStorage.setItem('AdminAuthToken', response.token);
            localStorage.setItem('AdminId',response.id);
            localStorage.setItem('Role',response.roles);
          }
          else {
            localStorage.setItem('UserAuthToken', response.token);
            localStorage.setItem('UserId',response.id);
            localStorage.setItem('Role',response.roles);
          }
          localStorage.setItem('fName',response.name)
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert(err);
        }
      });
    }
    else {
      alert("Check Errors and Fix It.");
    }
  }
}
