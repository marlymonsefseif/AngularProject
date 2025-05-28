import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AmenityService } from '../../services/amenity.service';
import { CommonModule } from '@angular/common';
import { AmenityDto } from '../../models/amenity.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-amenity',
  templateUrl: './add-amenity.component.html',
  styleUrls: ['./add-amenity.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddAmenityComponent implements OnInit {
  amenityForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;
  showSuccessAlert: boolean = false;

  constructor(
    private amenityService: AmenityService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is admin
    const adminToken = localStorage.getItem('AdminAuthToken');
    if (!adminToken) {
      this.router.navigate(['/login']);
      return;
    }

    this.amenityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  get nameControl() {
    return this.amenityForm.get('name');
  }

  onSubmit() {
    if (this.amenityForm.invalid) {
      this.errorMessage = 'Please enter a valid amenity name';
      return;
    }

    const name = this.nameControl?.value;

    if (!name) {
      this.errorMessage = 'Please enter a valid amenity name';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.showSuccessAlert = false;

    this.amenityService.addAmenity(name).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.successMessage = `Amenity "${name}" has been added successfully!`;
          this.showSuccessAlert = true;
          this.errorMessage = '';
          this.amenityForm.reset();
        } else {
          this.errorMessage = 'Failed to add amenity. Please try again.';
        }
        this.isSubmitting = false;

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessAlert = false;
          this.successMessage = '';
        }, 5000);
      },
      error: (error: HttpErrorResponse) => {
        if (error.error === 'Not authorized') {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = error.error || 'An error occurred while adding the amenity';
        }
        this.successMessage = '';
        this.showSuccessAlert = false;
        this.isSubmitting = false;
      }
    });
  }
} 