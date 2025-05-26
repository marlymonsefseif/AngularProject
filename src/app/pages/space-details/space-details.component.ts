// // import { ActivatedRoute, RouterLink } from '@angular/router';
// // import { GalleryService } from '../../services/gallery.service';
// // import { SpaceService } from '../../services/space.service';
// // import { Space, SpaceTypes } from './../../models/space.model';
// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';

// // @Component({
// //   selector: 'app-space-details',
// //   imports: [CommonModule, RouterLink, FormsModule],
// //   templateUrl: './space-details.component.html',
// //   styleUrl: './space-details.component.css'
// // })
// // export class SpaceDetailsComponent implements OnInit{
// //     id!:string| null;
// //     space!:Space;
// //     SpaceType = SpaceTypes;
// //     photo!:string;
// //     totalPrice: number | null = null;
// //     booking: {from:string,to:string,persons:number} = {
// //     from: '',
// //     to: '',
// //     persons: 1,
// //   };

// //     constructor(private service: SpaceService,private galleryService: GalleryService, private activerouter:ActivatedRoute){}
// //     ngOnInit(): void{
// //       this.id = this.activerouter.snapshot.paramMap.get('id'),
// //       this.service.getById(this.id).subscribe((response)=>{
// //         this.space = response;
// //         console.log(response);

// //       //   this.galleryService.getBySpace(this.space.id).subscribe((response) => {
// //       //   this.photo = response.imageUrl;
// //       // });
// //       });
// //     }

// //   calculateTotalPrice() {
// //     if (this.booking.from && this.booking.to) {
// //       const from = new Date(this.booking.from);
// //       const to = new Date(this.booking.to);
// //       const diffMs = to.getTime() - from.getTime();
// //       const hours = diffMs / (1000 * 60 * 60);

// //       if (hours > 0) {
// //         this.totalPrice = hours * this.space.pricePerHour;
// //       } else {
// //         this.totalPrice = null;
// //       }
// //     }
// //   }

// //   confirmBooking() {
// //     this.calculateTotalPrice();
// //     if (this.totalPrice) {
// //       alert(`Booking confirmed! Total: ${this.totalPrice} $`);
// //     } else {
// //       alert('Please enter valid dates');
// //     }
// //   }
// // }



// import { loadStripe } from '@stripe/stripe-js';
// import { PaymentService } from '../../services/payment.service';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { GalleryService } from '../../services/gallery.service';
// import { SpaceService } from '../../services/space.service';
// import { Space, SpaceTypes } from './../../models/space.model';
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// @Component({
//   selector: 'app-space-details',
//   templateUrl: './space-details.component.html',
//   imports: [CommonModule, RouterLink, FormsModule],
//   styleUrls: ['./space-details.component.css'],
// })
// export class SpaceDetailsComponent implements OnInit {
//   id!: string | null;
//   space!: Space;
//   SpaceType = SpaceTypes; // تعريف SpaceType للاستخدام في القالب
//   totalPrice: number | null = null;
//   booking: { from: string; to: string; persons: number } = {
//     from: '',
//     to: '',
//     persons: 1,
//   };

//   private stripePromise = loadStripe('pk_test_51RHudrC7seSHrVaTNuH78nuUGxR8XgsQrkby0EQcpZVsFr1dPiQ9Ixu6LQIYoOlaJltb5hyl15K8fR2K8K8SHyJn00EQueJV0S');

//   constructor(
//     private paymentService: PaymentService,
//     private spaceService: SpaceService,
//     private activatedRoute: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.id = this.activatedRoute.snapshot.paramMap.get('id');
//     if (this.id) {
//       this.spaceService.getById(this.id).subscribe(
//         (response) => {
//           this.space = response;
//         },
//         (error) => {
//           console.error('Failed to fetch space details', error);
//         }
//       );
//     }
//   }

//   calculateTotalPrice(): void {
//     if (this.booking.from && this.booking.to) {
//       const from = new Date(this.booking.from);
//       const to = new Date(this.booking.to);
//       const diffMs = to.getTime() - from.getTime();
//       const hours = diffMs / (1000 * 60 * 60);

//       if (hours > 0) {
//         this.totalPrice = hours * this.space.pricePerHour;
//       } else {
//         this.totalPrice = null;
//       }
//     }
//   }

//   async confirmBooking(): Promise<void> {
//     this.calculateTotalPrice();

//     if (this.totalPrice) {
//       const paymentRequest = {
//         amount: this.totalPrice * 100, // تحويل إلى سنتات
//         currency: 'usd',
//         description: `Booking for ${this.space.name}`,
//       };

//       //console.log(paymentRequest);

//       this.paymentService.createPaymentIntent(paymentRequest).subscribe(
//         async (response) => {
//           const stripe = await this.stripePromise;
//           console.log(stripe);
//           if (stripe) {
//             const result = await stripe.redirectToCheckout({
//               sessionId: response.clientSecret,
//             });

//             if (result.error) {
//               console.error(result.error.message);
//             }
//           }
//         },
//         (error) => {
//           console.error('Payment failed', error);
//           alert('Payment failed. Please try again.');
//         }
//       );
//     } else {
//       alert('Please enter valid dates');
//     }
//   }
// }
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpaceService } from '../../services/space.service';
import { Space, SpaceTypes } from './../../models/space.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-space-details',
  templateUrl: './space-details.component.html',
  styleUrls: ['./space-details.component.css'],
  imports: [CommonModule, RouterLink, FormsModule],
})
export class SpaceDetailsComponent implements OnInit {
  id!: string | null;
  space!: Space;
  SpaceType = SpaceTypes;
  totalPrice: number | null = null;
  booking: { from: string; to: string; persons: number } = {
    from: '',
    to: '',
    persons: 1,
  };

  private stripePromise = loadStripe('pk_test_51RHudrC7seSHrVaTNuH78nuUGxR8XgsQrkby0EQcpZVsFr1dPiQ9Ixu6LQIYoOlaJltb5hyl15K8fR2K8K8SHyJn00EQueJV0S');

  constructor(
    private paymentService: PaymentService,
    private spaceService: SpaceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.spaceService.getById(this.id).subscribe({
        next: (response) => (this.space = response),
        error: (err) => console.error('Failed to fetch space details', err),
      });
    }
  }

  calculateTotalPrice(): void {
    if (this.booking.from && this.booking.to && this.space) {
      const from = new Date(this.booking.from);
      const to = new Date(this.booking.to);
      const diffMs = to.getTime() - from.getTime();
      const hours = diffMs / (1000 * 60 * 60);

      this.totalPrice = hours > 0 ? hours * this.space.pricePerHour : null;
    }
  }

  async confirmBooking(): Promise<void> {
    this.calculateTotalPrice();

    if (this.totalPrice) {
      const paymentRequest = {
        amount: this.totalPrice * 100, 
        currency: 'usd',
        description: `Booking for ${this.space.name}`,
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
    } else {
      alert('Please enter valid dates');
    }
  }
}
