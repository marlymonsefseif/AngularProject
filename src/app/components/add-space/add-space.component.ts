import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpaceService } from '../../services/space.service';
import { AmenityService } from '../../services/amenity.service';
import { SpaceDTO } from '../../models/space.model';
import { Amenity } from '../../models/amenity.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-space',
  templateUrl: './add-space.component.html',
  styleUrls: ['./add-space.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddSpaceComponent implements OnInit {
  spaceForm!: FormGroup;
  amenities: Amenity[] = [];
  isLoadingAmenities: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;
  showSuccessAlert: boolean = false;

  constructor(
    private spaceService: SpaceService,
    private amenityService: AmenityService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadAmenities();
  }

  private initializeForm(): void {
    this.spaceForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      pricePerHour: ['', [Validators.required, Validators.min(0)]],
      spaceType: ['', Validators.required],
      availableFrom: ['', Validators.required],
      availableTo: ['', Validators.required],
      isAvailable: [true],
      description: ['', [Validators.required, Validators.minLength(10)]],
      amenitieIds: [[], Validators.required]
    });
  }

  private loadAmenities(): void {
    this.isLoadingAmenities = true;
    this.amenityService.getAmenities().subscribe({
      next: (amenities: Amenity[]) => {
        this.amenities = amenities;
        this.isLoadingAmenities = false;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to load amenities. Please try again.';
        this.isLoadingAmenities = false;
      }
    });
  }

  toggleAmenity(amenityId: number | undefined): void {
    if (amenityId === undefined) return;
    
    const currentAmenities = this.spaceForm.get('amenitieIds')?.value || [];
    const index = currentAmenities.indexOf(amenityId);
    
    if (index === -1) {
      currentAmenities.push(amenityId);
    } else {
      currentAmenities.splice(index, 1);
    }
    
    this.spaceForm.get('amenitieIds')?.setValue([...currentAmenities]);
  }

  onSubmit(): void {
    if (this.spaceForm.invalid) {
      console.log('Form validation errors:', this.spaceForm.errors);
      Object.keys(this.spaceForm.controls).forEach(key => {
        const control = this.spaceForm.get(key);
        if (control?.errors) {
          console.log(`${key} validation errors:`, control.errors);
        }
      });
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.showSuccessAlert = false;

    const formData = this.spaceForm.value;
    
    // Format the data to match the backend requirements
    const spaceDto: SpaceDTO = {
      name: formData.name,
      description: formData.description,
      capacity: Number(formData.capacity),
      pricePerHour: Number(formData.pricePerHour),
      availableFrom: `${formData.availableFrom}:00`,
      availableTo: `${formData.availableTo}:00`,
      isAvailable: formData.isAvailable,
      spaceType: Number(formData.spaceType),
      amenitieIds: formData.amenitieIds
    };

    console.log('Data being sent to backend:', spaceDto);

    this.spaceService.addSpace(spaceDto).subscribe({
      next: (response: any) => {
        if (response.status === 201) {
          this.successMessage = `Space "${spaceDto.name}" has been added successfully!`;
          this.showSuccessAlert = true;
          this.errorMessage = '';
          this.spaceForm.reset();
        } else {
          this.errorMessage = 'Failed to add space. Please try again.';
        }
        this.isSubmitting = false;

        setTimeout(() => {
          this.showSuccessAlert = false;
          this.successMessage = '';
        }, 5000);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding space:', error);
        console.error('Error response:', error.error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        
        if (error.status === 0) {
          this.errorMessage = 'Unable to connect to the server. Please check if the backend is running.';
        } else if (error.status === 404) {
          this.errorMessage = 'The space endpoint was not found. Please check the API configuration.';
        } else if (error.status === 400) {
          // Show the specific validation error from the backend if available
          const errorMessage = error.error?.message || error.error || 'Invalid data provided. Please check your input.';
          this.errorMessage = errorMessage;
          console.error('Validation errors:', error.error);
        } else {
          this.errorMessage = error.error || `Server error (${error.status}). Please try again later.`;
        }
        this.successMessage = '';
        this.showSuccessAlert = false;
        this.isSubmitting = false;
      }
    });
  }
} 