// Fixed product.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('productsGrid', { static: false }) productsGrid!: ElementRef<HTMLElement>;
  
  canScrollLeft = false;
  canScrollRight = true;
  
  private readonly SCROLL_AMOUNT = 420; // Card width + gap
  
  readonly products: Product[] = [
    {
      id: 1,
      title: 'Cloud Solutions',
      description: 'Scalable cloud strategies tailored to your business, ensuring efficiency and innovation.',
      image: '/assets/images/vectors/darkvector1.png',
      category: 'Infrastructure'
    },
    {
      id: 2,
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions that transform data into actionable insights for your business growth.',
      image: '/assets/images/vectors/darkvector2.png',
      category: 'Technology'
    },
    {
      id: 3,
      title: 'Cybersecurity Solutions',
      description: 'Comprehensive security frameworks protecting your digital assets and business continuity.',
      image: '/assets/images/vectors/darkvector3.png',
      category: 'Security'
    },
    {
      id: 4,
      title: 'Digital Transformation',
      description: 'Complete digital transformation solutions to modernize your business operations.',
      image: '/assets/images/vectors/darkvector4.png',
      category: 'Innovation'
    },
    {
      id: 5,
      title: 'Data Analytics',
      description: 'Advanced analytics platforms that turn your data into competitive advantage.',
      image: '/assets/images/vectors/darkvector5.png',
      category: 'Analytics'
    }
  ];

  private resizeObserver?: ResizeObserver;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    // Only run browser-specific code in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        this.updateScrollIndicators();
        this.setupResizeObserver();
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeObserver?.disconnect();
    }
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/mainproducts', productId]).catch(
      error => console.error('Navigation error:', error)
    );
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  scrollLeft(): void {
    if (isPlatformBrowser(this.platformId) && this.productsGrid) {
      this.productsGrid.nativeElement.scrollBy({
        left: -this.SCROLL_AMOUNT,
        behavior: 'smooth'
      });
    }
  }

  scrollRight(): void {
    if (isPlatformBrowser(this.platformId) && this.productsGrid) {
      this.productsGrid.nativeElement.scrollBy({
        left: this.SCROLL_AMOUNT,
        behavior: 'smooth'
      });
    }
  }

  updateScrollIndicators(): void {
    if (isPlatformBrowser(this.platformId) && this.productsGrid) {
      const container = this.productsGrid.nativeElement;
      this.canScrollLeft = container.scrollLeft > 0;
      this.canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth);
    }
  }

  private setupResizeObserver(): void {
    if (isPlatformBrowser(this.platformId) && this.productsGrid) {
      // Update scroll indicators on resize
      this.resizeObserver = new ResizeObserver(() => {
        this.updateScrollIndicators();
      });
      this.resizeObserver.observe(this.productsGrid.nativeElement);
    }
  }
}