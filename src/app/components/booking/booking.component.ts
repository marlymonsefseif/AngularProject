import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-list',
  imports: [],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingListComponent implements OnInit {
  allBookings: any[] = [];
  filteredBookings: any[] = [];
  currentTab: string = 'pending'; 
  isLoading: boolean = false;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.isLoading = true;
    this.filteredBookings = [];

    if (this.currentTab === 'pending') {
      this.bookingService.getPendingBookings().subscribe({
        next: (bookings) => {
          this.filteredBookings = bookings;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
    else if (this.currentTab === 'confirmed') {
      this.bookingService.getConfirmedBookings().subscribe({
        next: (bookings) => {
          this.filteredBookings = bookings;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
    else if (this.currentTab === 'cancelled') {
      this.bookingService.getCancelledBookings().subscribe({
        next: (bookings) => {
          this.filteredBookings = bookings;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }

  setTab(tab: string) {
    this.currentTab = tab;
    this.loadBookings();
  }

  deleteBooking(id:any) {
    this.bookingService.removeBooking(id).subscribe({
      next: (response) => {
        console.log(response.message);
      }
    });
  }
}