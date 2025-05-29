import { Membership } from './../../models/membership';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MemberShipServiceService } from '../../services/member-ship-service.service';
import { AmenityService } from '../../services/amenity.service';
import { StaticServiceService } from '../../services/static-service.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userId:any = localStorage.getItem("UserId");
  token : any = localStorage.getItem("UserAuthToken");
  spaces!:any;
  memberShips!:any;
  aminities!:any;

  constructor(private userService:UserService,
              private router:Router,
              private spaceService:StaticServiceService,
              private membership:MemberShipServiceService){}

  
  ngOnInit(): void {
  this.spaces= this.spaceService.getAllSpaces();

  this.membership.getMemberShips().subscribe({
    next:(response)=>{
      this.memberShips=response;
      console.log(response);
    },
    error:(error)=>{
      console.log(error);
    }
   });
   
  this.aminities=this.spaceService.getAllAminities();
  }


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

 
  membershippp(price:number){
     console.log('Selected price:', price);
  }
}
