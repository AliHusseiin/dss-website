// header.component.ts
import { Component, HostListener, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Listen for route changes and handle fragments
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          // Handle fragment after route change
          if (event.urlAfterRedirects.includes('#')) {
            const fragment = event.urlAfterRedirects.split('#')[1];
            if (fragment) {
              setTimeout(() => {
                this.scrollToElement(fragment);
              }, 300); // Reduced delay for better responsiveness
            }
          }
        });
    }
  }

  ngAfterViewInit(): void {
    // Handle initial fragment if present
    if (isPlatformBrowser(this.platformId)) {
      const fragment = this.router.parseUrl(this.router.url).fragment;
      if (fragment) {
        setTimeout(() => {
          this.scrollToElement(fragment);
        }, 200); // Reduced delay for better user experience
      }
    }
  }

  // Navigate to section - handles both same page and cross-page navigation
  navigateToSection(sectionId: string, event: Event): void {
    // Only run in browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Prevent default behavior
    event.preventDefault();
    event.stopPropagation();
    
    // Close mobile menu if open
    this.closeMobileMenu();
    
    // Check if we're already on the home page
    const currentUrl = this.router.url.split('#')[0]; // Remove fragment if present
    if (currentUrl === '/' || currentUrl === '') {
      // We're on home page - scroll immediately with minimal delay
      this.scrollToElementImmediate(sectionId);
    } else {
      // We're on a different page, navigate to home first
      this.router.navigate(['/'], { fragment: sectionId });
    }
  }

  // Immediate scroll for same-page navigation
  private scrollToElementImmediate(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbar = document.querySelector('.navbar') as HTMLElement;
      const navbarHeight = navbar?.offsetHeight || 80;
      const elementPosition = element.offsetTop - navbarHeight - 20;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    } else {
      // Element might not be ready yet, try once more with minimal delay
      requestAnimationFrame(() => {
        const retryElement = document.getElementById(sectionId);
        if (retryElement) {
          const navbar = document.querySelector('.navbar') as HTMLElement;
          const navbarHeight = navbar?.offsetHeight || 80;
          const elementPosition = retryElement.offsetTop - navbarHeight - 20;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        } else {
          console.warn(`Element with id '${sectionId}' not found`);
        }
      });
    }
  }

  // Scroll to specific element (for cross-page navigation)
  private scrollToElement(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbar = document.querySelector('.navbar') as HTMLElement;
      const navbarHeight = navbar?.offsetHeight || 80;
      const elementPosition = element.offsetTop - navbarHeight - 20;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    } else {
      // If element not found, try again after a short delay
      setTimeout(() => {
        const retryElement = document.getElementById(sectionId);
        if (retryElement) {
          const navbar = document.querySelector('.navbar') as HTMLElement;
          const navbarHeight = navbar?.offsetHeight || 80;
          const elementPosition = retryElement.offsetTop - navbarHeight - 20;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        } else {
          console.warn(`Element with id '${sectionId}' not found`);
        }
      }, 500);
    }
  }

  // Close mobile menu
  closeMobileMenu(): void {
    // Only run in browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
    
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      // For Bootstrap 5, use the Collapse class
      if (typeof (window as any).bootstrap !== 'undefined') {
        const bsCollapse = new (window as any).bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      } else {
        // Fallback: manually remove classes
        navbarCollapse.classList.remove('show');
        if (navbarToggler) {
          navbarToggler.setAttribute('aria-expanded', 'false');
        }
      }
    }
  }
}