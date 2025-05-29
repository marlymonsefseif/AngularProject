import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../services/gallery.service';
import { SpaceService } from '../../services/space.service';
import { GalleryDTO } from '../../models/gallery.model';
import { Space } from '../../models/space.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class GalleryComponent implements OnInit {
  galleryForm!: FormGroup;
  spaces: Space[] = [];
  isLoadingSpaces: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;
  showSuccessAlert: boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private galleryService: GalleryService,
    private spaceService: SpaceService,
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

    this.initializeForm();
    this.loadSpaces();
  }

  private initializeForm(): void {
    this.galleryForm = this.fb.group({
      ImgaeFile: [null, Validators.required],
      caption: [''],
      spaceId: ['', Validators.required]
    });
  }

  private loadSpaces(): void {
    this.isLoadingSpaces = true;
    this.spaceService.getSpaces().subscribe({
      next: (spaces: Space[]) => {
        this.spaces = spaces;
        this.isLoadingSpaces = false;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to load spaces. Please try again.';
        this.isLoadingSpaces = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.galleryForm.patchValue({ ImgaeFile: this.selectedFile });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.galleryForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.showSuccessAlert = false;

    const formData = new FormData();
    formData.append('ImgaeFile', this.galleryForm.get('ImgaeFile')?.value);
    formData.append('caption', this.galleryForm.get('caption')?.value || '');
    formData.append('spaceId', this.galleryForm.get('spaceId')?.value);

    this.galleryService.uploadImage(formData).subscribe({
      next: (response: any) => {
        this.successMessage = 'Image uploaded successfully!';
        this.showSuccessAlert = true;
        this.errorMessage = '';
        this.galleryForm.reset();
        this.selectedFile = null;
        this.previewUrl = null;
        this.isSubmitting = false;

        setTimeout(() => {
          this.showSuccessAlert = false;
          this.successMessage = '';
        }, 5000);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error uploading image:', error);
        if (error.error === 'Not authorized') {
          this.router.navigate(['/login']);
        } else if (error.status === 0) {
          this.errorMessage = 'Unable to connect to the server. Please check if the backend is running.';
        } else if (error.status === 404) {
          this.errorMessage = 'The gallery endpoint was not found. Please check the API configuration.';
        } else if (error.status === 400) {
          const errorMessage = error.error?.errors?.ImgaeFile?.[0] || error.error?.message || 'Invalid data provided. Please check your input.';
          this.errorMessage = errorMessage;
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