import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MemberShipServiceService } from '../../services/member-ship-service.service';
import { AmenityService } from '../../services/amenity.service';
import { StaticServiceService } from '../../services/static-service.service';
import { PaymentService } from '../../services/payment.service';
import { loadStripe } from '@stripe/stripe-js';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userId: any = localStorage.getItem("UserId");
  token: any = localStorage.getItem("UserAuthToken");
  spaces!: any;
  memberShips!: any;
  aminities!: any;

  constructor(private userService: UserService,
    private router: Router,
    private spaceService: StaticServiceService,
    private membership: MemberShipServiceService,
    private paymentService: PaymentService) { }

  private stripePromise = loadStripe('pk_test_51RHudrC7seSHrVaTNuH78nuUGxR8XgsQrkby0EQcpZVsFr1dPiQ9Ixu6LQIYoOlaJltb5hyl15K8fR2K8K8SHyJn00EQueJV0S');




  ngOnInit(): void {
    this.spaces = this.spaceService.getAllSpaces();

    this.membership.getMemberShips().subscribe({
      next: (response) => {
        this.memberShips = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.aminities = this.spaceService.getAllAminities();
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



  async confirmMemberShip(price: number, name: string): Promise<void> {
    if (!this.token) {
      alert('Please login to proceed with payment');
      this.router.navigate(['/login']);
      return;
    }
    const paymentRequest = {
      amount: price * 100,
      currency: 'usd',
      description: `Booking for ${name}`,
      paymentMethodId: "pm_card_visa"
    };

    this.paymentService.createPaymentIntent(paymentRequest).subscribe({
      next: async (response) => {
        const stripe = await this.stripePromise;
        if (stripe) {
          const result = await stripe.redirectToCheckout({
            sessionId: response.clientSecret,
          });

          if (result.error) {
            console.error(result.error.message);
          }
        }
      },
      error: (error) => {
        console.error('Payment failed', error);
        alert('Payment failed. Please try again.');
      },
    });
  }

}

