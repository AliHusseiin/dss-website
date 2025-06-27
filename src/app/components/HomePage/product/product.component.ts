// product.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements AfterViewInit {
  
  @ViewChild('productsGrid', { static: false }) productsGrid!: ElementRef;
  
  canScrollLeft = false;
  canScrollRight = true;
  
  products = [
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

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Initial check for scroll indicators
    setTimeout(() => {
      this.updateScrollIndicators();
    }, 100);
  }

  navigateToProduct(productId: number) {
    console.log('Navigating to product:', productId);
    this.router.navigate(['/mainproducts', productId]).then(
      (success) => console.log('Navigation success:', success),
      (error) => console.error('Navigation error:', error)
    );
  }

  trackByProductId(index: number, product: any): number {
    return product.id;
  }

  scrollLeft() {
    const container = this.productsGrid.nativeElement;
    const scrollAmount = 420; // Card width + gap (400px + 20px)
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    const container = this.productsGrid.nativeElement;
    const scrollAmount = 420; // Card width + gap (400px + 20px)
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  updateScrollIndicators() {
    const container = this.productsGrid.nativeElement;
    this.canScrollLeft = container.scrollLeft > 0;
    this.canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth);
  }
}