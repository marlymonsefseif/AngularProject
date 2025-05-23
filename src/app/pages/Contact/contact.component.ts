import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  messages!:any[];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.maxLength(150)]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.contactService.getMessage().subscribe({
      next: (response) => {
        this.messages = response;
      } 
    })
    
  }


  submitError = false;
  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const messageData: Contact = { 
        fullName: this.contactForm.value.fullName,
        email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message
      };

      this.contactService.sendMessage(messageData).subscribe({
        next: () => {
          this.submitSuccess = true;
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          this.submitError = true;
          this.isSubmitting = false;
        }
      });
    }
  }

}