import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpaceService } from '../../services/space.service';
import { Space, SpaceTypes } from './../../models/space.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Booking, Status } from '../../models/booking';

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
    private bookingService : BookingService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.spaceService.getById(this.id).subscribe({
        next: (response) => {
          this.space = response;
          if (this.space.galleries && this.space.galleries.length > 0) {
            this.space.galleries[0].imageUrl = 'http://localhost:17102/' + this.space.galleries[0].imageUrl;
            console.log(this.space.galleries[0].imageUrl);
          }
        },
        error: (err) => console.error('Failed to fetch space details', err),
      });
    }
  }

  calculateTotalPrice(): void {
  if (this.booking.from && this.booking.to && this.space) {
    const [fromHours, fromMinutes, fromSeconds = "0"] = this.booking.from.split(':').map(Number);
    const [toHours, toMinutes, toSeconds = "0"] = this.booking.to.split(':').map(Number);

    const fromTotalSeconds = fromHours * 3600 + fromMinutes * 60 + Number(fromSeconds);
    const toTotalSeconds = toHours * 3600 + toMinutes * 60 + Number(toSeconds);

    const diffInSeconds = toTotalSeconds - fromTotalSeconds;
    const hours = diffInSeconds / 3600;

    this.totalPrice = hours > 0 ? hours * this.space.pricePerHour : null;
  } else {
    this.totalPrice = null;
  }
}


  async confirmBooking(): Promise<void> {
    this.calculateTotalPrice();

    if (this.totalPrice) {
      const bookingData:Booking = {
            id: 0,
            startTime: this.formatTimeOnly(this.booking.from),
            endTime: this.formatTimeOnly(this.booking.to),
            amount: this.totalPrice,
            status: Status.Pending,
            userId: localStorage.getItem('UserId'),
            userName: localStorage.getItem('fName'),
            zoneId: this.id,
            zoneName: this.space.name
          };
          console.log(bookingData)
          
      const paymentRequest = {
        amount: this.totalPrice * 100,
        currency: 'usd',
        description: `Booking for ${this.space.name}`,
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
    } else {
      alert('Please enter valid dates');
    }
  }
  formatTimeOnly(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}:00`;
}
}
