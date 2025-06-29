// floating-buttons.component.ts
import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  // Using signals for better performance
  readonly showContactDialog = signal(false);
  readonly isSubmitting = signal(false);
  
  // Contact form data
  contactData: ContactData = {
    name: '',
    email: '',
    message: ''
  };

  // Constants
  private readonly SUPPORT_EMAIL = 'support@deepsmartsystems.com';
  private readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  openBot(): void {
    this.router.navigateByUrl('/chatbot');
  }

  openContactDialog(): void {
    this.showContactDialog.set(true);
    this.setBodyScroll(false);
  }

  closeContactDialog(): void {
    this.showContactDialog.set(false);
    this.setBodyScroll(true);
    this.resetContactForm();
  }

  submitContactForm(): void {
    if (this.isSubmitting()) return;

    const validation = this.validateForm();
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    this.isSubmitting.set(true);
    this.sendEmail();
  }

  // Direct email method
  sendDirectEmail(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const mailtoLink = this.createMailtoLink(
      'Inquiry from Website',
      'Hello,\n\nI would like to inquire about your services.\n\nBest regards,'
    );
    
    window.location.href = mailtoLink;
  }

  // Navigate to contact page
  openContact(): void {
    this.router.navigateByUrl('/contact-us');
  }

  // Private methods
  private validateForm(): { isValid: boolean; message: string } {
    const { name, email, message } = this.contactData;
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      return { isValid: false, message: 'Please fill in all fields.' };
    }
    
    if (!this.EMAIL_REGEX.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address.' };
    }
    
    return { isValid: true, message: '' };
  }

  private sendEmail(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const subject = `Contact Form Submission from ${this.contactData.name}`;
    const body = this.createEmailBody();
    const mailtoLink = this.createMailtoLink(subject, body);
    
    window.location.href = mailtoLink;
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      this.handleEmailSuccess();
    });
  }

  private createMailtoLink(subject: string, body: string): string {
    return `mailto:${this.SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  private createEmailBody(): string {
    const { name, email, message } = this.contactData;
    return `Dear Support Team,

I am contacting you through your website contact form.

Contact Information:
- Name: ${name}
- Email: ${email}

Message:
${message}

Please reply to this email at your earliest convenience.

Best regards,
${name}

---
This email was generated from the contact form on your website.
Timestamp: ${new Date().toLocaleString()}`;
  }

  private handleEmailSuccess(): void {
    this.isSubmitting.set(false);
    alert('Your email client has been opened with the message to support@deepsmartsystems.com. Please send the email to complete your contact request.');
    this.closeContactDialog();
  }

  private resetContactForm(): void {
    this.contactData = { name: '', email: '', message: '' };
  }

  private setBodyScroll(enabled: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = enabled ? 'auto' : 'hidden';
    }
  }
}