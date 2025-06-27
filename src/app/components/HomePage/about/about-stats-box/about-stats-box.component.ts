import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-stats-box',
  standalone: true,
  imports: [],
 templateUrl: './about-stats-box.component.html',
  styleUrl: './about-stats-box.component.css'
})
export class StatsBoxComponent implements AfterViewInit, OnDestroy {
  @ViewChild('statsContainer', { static: false }) statsContainer!: ElementRef;
  @ViewChild('counter1', { static: false }) counter1!: ElementRef;
  @ViewChild('counter2', { static: false }) counter2!: ElementRef;
  @ViewChild('counter3', { static: false }) counter3!: ElementRef;

  private observer!: IntersectionObserver;
  private animationStarted = false;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.setupIntersectionObserver();
      }, 100);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined' || !this.statsContainer?.nativeElement) {
      setTimeout(() => this.startAnimations(), 1000);
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animationStarted) {
          this.startAnimations();
          this.animationStarted = true;
        }
      });
    }, {
      threshold: 0.3
    });

    this.observer.observe(this.statsContainer.nativeElement);
  }

  private startAnimations() {
    if (!this.statsContainer?.nativeElement) {
      return;
    }

    // Add animation class to container
    this.statsContainer.nativeElement.classList.add('animate');

    // Start counter animations with delays
    if (this.isBrowser) {
      setTimeout(() => {
        if (this.counter1?.nativeElement) {
          this.animateCounter(this.counter1.nativeElement, 54, 2000, '%');
        }
      }, 500);

      setTimeout(() => {
        if (this.counter2?.nativeElement) {
          this.animateCounter(this.counter2.nativeElement, 92.71, 2000, 'M');
        }
      }, 700);

      setTimeout(() => {
        if (this.counter3?.nativeElement) {
          this.animateCounter(this.counter3.nativeElement, 9.4, 2000, '%');
        }
      }, 900);
    }
  }

  private animateCounter(element: HTMLElement, target: number, duration: number, suffix: string = '') {
    if (!this.isBrowser) {
      element.textContent = target.toString() + suffix;
      return;
    }

    const start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + (target - start) * easeOutQuart;
      
      let displayValue: string;
      if (target >= 1) {
        displayValue = current.toFixed(target % 1 === 0 ? 0 : 2);
      } else {
        displayValue = current.toFixed(2);
      }
      
      element.textContent = displayValue + suffix;
      
      if (progress < 1 && this.isBrowser && typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(updateCounter);
      }
    };
    
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(updateCounter);
    } else {
      const fallbackAnimation = () => {
        updateCounter(performance.now());
        if (element.textContent !== target.toString() + suffix) {
          setTimeout(fallbackAnimation, 16);
        }
      };
      fallbackAnimation();
    }
  }
}