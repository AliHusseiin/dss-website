// floating-buttons.component.ts
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactData {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-floating-buttons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './floating-buttons.component.html',
  styleUrls: ['./floating-buttons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingButtonsComponent {
  // Dialog state
  showContactDialog = false;
  isSubmitting = false;
  
  // Contact form data
  contactData: ContactData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  openBot(): void {
    // Open chatbot - you can replace with modal or external service
    this.router.navigateByUrl('/chatbot');
  }

  openContactDialog(): void {
    this.showContactDialog = true;
    // Prevent body scroll when dialog is open
    document.body.style.overflow = 'hidden';
    // Manually trigger change detection
    this.cdr.detectChanges();
  }

  closeContactDialog(): void {
    this.showContactDialog = false;
    // Restore body scroll
    document.body.style.overflow = 'auto';
    // Reset form data
    this.resetContactForm();
    // Manually trigger change detection
    this.cdr.detectChanges();
  }

  
  submitContactForm(): void {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.cdr.detectChanges();
    
    // Here you would typically send the data to your backend
    console.log('Contact form submitted:', this.contactData);
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      // Show success message or handle response
      alert('Thank you for your message! We will get back to you soon.');
      this.closeContactDialog();
    }, 2000);
    
    // Replace the above with your actual API call:
    // this.contactService.submitContactForm(this.contactData).subscribe({
    //   next: (response) => {
    //     this.isSubmitting = false;
    //     // Handle success
    //     this.closeContactDialog();
    //   },
    //   error: (error) => {
    //     this.isSubmitting = false;
    //     // Handle error
    //   }
    // });
  }

  private resetContactForm(): void {
    this.contactData = {
      name: '',
      email: '',
      message: ''
    };
  }

  // Alternative method if you want to navigate to contact page
  openContact(): void {
    this.router.navigateByUrl('/contact-us');
  }

  // Alternative: Direct WhatsApp contact
  callWhatsApp(): void {}
}