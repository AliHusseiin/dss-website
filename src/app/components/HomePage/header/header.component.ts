// header.component.ts
import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // Remove the fixNavigationEvents call - it's causing the double-click issue
  }

  // Fixed scroll to section method
  scrollToSection(sectionId: string, event: Event): void {
    // Only run in browser
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Prevent default behavior
    event.preventDefault();
    event.stopPropagation();
    
    // Close mobile menu if open
    this.closeMobileMenu();
    
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbar = document.querySelector('.navbar') as HTMLElement;
        const navbarHeight = navbar?.offsetHeight || 80;
        const elementPosition = element.offsetTop - navbarHeight - 20; // Extra 20px padding
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  // Close mobile menu
  private closeMobileMenu(): void {
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

  // Remove the fixNavigationEvents method entirely - it's not needed
}