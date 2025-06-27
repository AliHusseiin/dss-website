import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-text',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about-text.component.html',
  styleUrl: './about-text.component.css'
})
export class AboutTextComponent implements AfterViewInit {
  @ViewChild('highlightNumber', { static: false }) highlightNumber!: ElementRef;
  
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.startAnimation();
      }, 500);
    }
  }

  private startAnimation() {
    if (this.highlightNumber?.nativeElement) {
      this.highlightNumber.nativeElement.classList.add('animate');
    }
  }
}