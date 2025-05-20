import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddAmenityComponent } from './add-amenity.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddAmenityComponent
  ]
})
export class AddAmenityModule { } 