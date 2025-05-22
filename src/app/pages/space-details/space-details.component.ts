import { ActivatedRoute, RouterLink } from '@angular/router';
import { GalleryService } from '../../services/gallery.service';
import { SpaceService } from '../../services/space.service';
import { Space, SpaceTypes } from './../../models/space.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-space-details',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './space-details.component.html',
  styleUrl: './space-details.component.css'
})
export class SpaceDetailsComponent implements OnInit{
    id!:string| null;
    space!:Space;
    SpaceType = SpaceTypes;
    photo!:string;
    totalPrice: number | null = null;
    booking: {from:string,to:string,persons:number} = {
    from: '',
    to: '',
    persons: 1,
  };

    constructor(private service: SpaceService,private galleryService: GalleryService, private activerouter:ActivatedRoute){}
    ngOnInit(): void{
      this.id = this.activerouter.snapshot.paramMap.get('id'),
      this.service.getById(this.id).subscribe((response)=>{
        this.space = response;
        console.log(response);

      //   this.galleryService.getBySpace(this.space.id).subscribe((response) => {
      //   this.photo = response.imageUrl;
      // });
      });
    }

  calculateTotalPrice() {
    if (this.booking.from && this.booking.to) {
      const from = new Date(this.booking.from);
      const to = new Date(this.booking.to);
      const diffMs = to.getTime() - from.getTime();
      const hours = diffMs / (1000 * 60 * 60);

      if (hours > 0) {
        this.totalPrice = hours * this.space.pricePerHour;
      } else {
        this.totalPrice = null;
      }
    }
  }

  confirmBooking() {
    this.calculateTotalPrice();
    if (this.totalPrice) {
      alert(`Booking confirmed! Total: ${this.totalPrice} $`);
    } else {
      alert('Please enter valid dates');
    }
  }
}
