import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { IReview } from '../../models/ireview';

@Component({
  selector: 'app-about',
  imports: [RouterLink, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  getArray(count: number): any[] {
    return Array(count);
  }
  reviews: IReview[] = [];

  constructor(private reviewService: ReviewService) { }
  ngOnInit(): void {
    this.reviewService.getReviews().subscribe({
      next: (response) => {
        console.log(response);
        this.reviews = response;
      }
    });
  }

}
