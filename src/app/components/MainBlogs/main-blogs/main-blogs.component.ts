import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { BlogDialogComponent } from '../blog-dialog/blog-dialog.component';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  categoryIcon: string;
  author: string;
  readTime: string;
  date: string;
  imageClass: string;
  isFeatured?: boolean;
}

@Component({
  selector: 'app-main-blogs',
  standalone: true,
  imports: [CommonModule, BlogDialogComponent], // Add BlogDialogComponent to imports
  templateUrl: './main-blogs.component.html',
  styleUrl: './main-blogs.component.css'
})
export class MainBlogsComponent implements OnInit, OnDestroy {
  
  activeFilter = 'All Dimensions';
  private isBrowser: boolean;
  
  // Dialog state - Updated to work with separate component
  selectedPost: BlogPost | null = null;
  isDialogOpen = false;
  
  blogPosts: BlogPost[] = [
    {
      id: 2,
      title: 'Holographic Data Centers',
      excerpt: 'The next evolution in cloud infrastructure uses light-based storage systems that exist in multiple dimensions simultaneously.',
      category: '🔮 QUANTUM',
      categoryIcon: '🔮',
      author: 'Marcus Zero',
      readTime: '8 min',
      date: '2025.06.10',
      imageClass: 'quantum-image'
    },
    {
      id: 3,
      title: 'Mind-Machine Interface Revolution',
      excerpt: 'Explore how direct neural connections are transforming enterprise collaboration, enabling thought-speed decision making.',
      category: '🧠 NEURAL',
      categoryIcon: '🧠',
      author: 'Luna Stark',
      readTime: '10 min',
      date: '2025.06.08',
      imageClass: 'neural-image'
    },
    {
      id: 4,
      title: 'Metaverse Business Ecosystems',
      excerpt: 'Building virtual economies that transcend physical limitations, creating infinite possibilities for enterprise growth.',
      category: '🌟 STRATEGY',
      categoryIcon: '🌟',
      author: 'Neo Anderson',
      readTime: '15 min',
      date: '2025.06.05',
      imageClass: 'metaverse-image'
    },
    {
      id: 5,
      title: 'Augmented Enterprise Reality',
      excerpt: 'Discover how AR overlays are creating new dimensions of productivity, blending digital and physical workspaces seamlessly.',
      category: '⚡ REALITY',
      categoryIcon: '⚡',
      author: 'Zara Future',
      readTime: '9 min',
      date: '2025.06.02',
      imageClass: 'ar-image'
    },
    {
      id: 6,
      title: 'Blockchain Consciousness Networks',
      excerpt: 'The evolution of distributed ledgers into self-aware systems that can make autonomous business decisions.',
      category: '🔮 QUANTUM',
      categoryIcon: '🔮',
      author: 'Kai Matrix',
      readTime: '11 min',
      date: '2025.05.30',
      imageClass: 'blockchain-image'
    }
  ];

  filterTabs = [
    'All Dimensions',
    'Quantum Tech',
    'Neural Networks',
    'Future Strategy',
    'Digital Reality'
  ];

  private neuralLines: HTMLElement[] = [];
  private mouseTrailEnabled = true;
  private scrollHandler?: () => void;
  private mouseMoveHandler?: (e: MouseEvent) => void;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.createNeuralNetwork();
        this.initializeCardEffects();
        this.initializeParallax();
        this.initializeSmoothScroll();
        this.initializeCursorTrail();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    this.mouseTrailEnabled = false;
    
    if (this.isBrowser) {
      if (this.scrollHandler) {
        window.removeEventListener('scroll', this.scrollHandler);
      }
      if (this.mouseMoveHandler) {
        document.removeEventListener('mousemove', this.mouseMoveHandler);
      }
    }
  }

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
    if (this.isBrowser) {
      this.animateCards();
    }
  }

  onCardClick(post: BlogPost): void {
    // Set the selected post and open the dialog
    this.selectedPost = post;
    this.isDialogOpen = true;
    console.log('Opening dialog for post:', post.title);
  }

  onDialogClose(): void {
    // Handle dialog close event
    this.isDialogOpen = false;
    this.selectedPost = null;
    console.log('Dialog closed');
  }

  scrollToBlog(): void {
    if (!this.isBrowser) return;
    
    const blogSection = this.elementRef.nativeElement.querySelector('#blog');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private createNeuralNetwork(): void {
    if (!this.isBrowser) return;
    
    const network = this.elementRef.nativeElement.querySelector('#neuralNetwork');
    if (!network) return;

    const lineCount = 15;
    
    for (let i = 0; i < lineCount; i++) {
      const line = this.renderer.createElement('div');
      this.renderer.addClass(line, 'neural-line');
      
      const isHorizontal = Math.random() > 0.5;
      if (isHorizontal) {
        this.renderer.setStyle(line, 'width', Math.random() * 200 + 100 + 'px');
        this.renderer.setStyle(line, 'height', '1px');
        this.renderer.setStyle(line, 'top', Math.random() * 100 + '%');
        this.renderer.setStyle(line, 'left', Math.random() * 100 + '%');
      } else {
        this.renderer.setStyle(line, 'width', '1px');
        this.renderer.setStyle(line, 'height', Math.random() * 200 + 100 + 'px');
        this.renderer.setStyle(line, 'top', Math.random() * 100 + '%');
        this.renderer.setStyle(line, 'left', Math.random() * 100 + '%');
      }
      
      this.renderer.setStyle(line, 'animation-delay', Math.random() * 4 + 's');
      this.renderer.setStyle(line, 'animation-duration', Math.random() * 4 + 3 + 's');
      this.renderer.appendChild(network, line);
      this.neuralLines.push(line);
    }
  }

  private initializeCardEffects(): void {
    if (!this.isBrowser) return;
    
    const cards = this.elementRef.nativeElement.querySelectorAll('.blog-card');
    
    cards.forEach((card: HTMLElement) => {
      this.renderer.listen(card, 'mouseenter', () => {
        this.renderer.setStyle(card, 'z-index', '10');
      });
      
      this.renderer.listen(card, 'mouseleave', () => {
        this.renderer.setStyle(card, 'z-index', '1');
        this.renderer.setStyle(card, 'transform', 'translateY(0) rotateX(0deg) rotateY(0deg)');
      });

      this.renderer.listen(card, 'click', (e: MouseEvent) => {
        this.createRippleEffect(card, e);
      });
    });
  }

  private createRippleEffect(element: HTMLElement, event: MouseEvent): void {
    if (!this.isBrowser) return;
    
    const rect = element.getBoundingClientRect();
    const ripple = this.renderer.createElement('div');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    this.renderer.setStyle(ripple, 'position', 'absolute');
    this.renderer.setStyle(ripple, 'width', size + 'px');
    this.renderer.setStyle(ripple, 'height', size + 'px');
    this.renderer.setStyle(ripple, 'left', x + 'px');
    this.renderer.setStyle(ripple, 'top', y + 'px');
    this.renderer.setStyle(ripple, 'background', 'radial-gradient(circle, rgba(0, 0, 204, 0.3), transparent)');
    this.renderer.setStyle(ripple, 'border-radius', '50%');
    this.renderer.setStyle(ripple, 'transform', 'scale(0)');
    this.renderer.setStyle(ripple, 'animation', 'ripple 0.8s linear');
    this.renderer.setStyle(ripple, 'pointer-events', 'none');
    this.renderer.setStyle(ripple, 'z-index', '1000');
    
    this.renderer.appendChild(element, ripple);
    
    setTimeout(() => {
      if (element.contains(ripple)) {
        this.renderer.removeChild(element, ripple);
      }
    }, 800);
  }

  private animateCards(): void {
    if (!this.isBrowser) return;
    
    const cards = this.elementRef.nativeElement.querySelectorAll('.blog-card');
    cards.forEach((card: HTMLElement, index: number) => {
      this.renderer.setStyle(card, 'animation', 'none');
      this.renderer.setStyle(card, 'opacity', '0');
      this.renderer.setStyle(card, 'transform', 'translateY(30px) rotateY(-30deg)');
      
      setTimeout(() => {
        this.renderer.setStyle(card, 'opacity', '1');
        this.renderer.setStyle(card, 'animation', `cardReveal 0.8s ease-out ${index * 0.1}s both`);
      }, 300 + index * 50);
    });
  }

  private initializeParallax(): void {
    if (!this.isBrowser) return;
    
    this.scrollHandler = () => {
      const scrolled = window.pageYOffset;
      const orbs = this.elementRef.nativeElement.querySelectorAll('.floating-orb');
      
      orbs.forEach((orb: HTMLElement, index: number) => {
        const speed = 0.2 + index * 0.1;
        const yPos = scrolled * speed;
        this.renderer.setStyle(orb, 'transform', `translate3d(0, ${yPos}px, 0)`);
      });
    };
    
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  private initializeSmoothScroll(): void {
    if (!this.isBrowser) return;
    
    const ctaButton = this.elementRef.nativeElement.querySelector('.hero-cta');
    if (ctaButton) {
      this.renderer.listen(ctaButton, 'click', (e: Event) => {
        e.preventDefault();
        this.scrollToBlog();
      });
    }
  }

  private initializeCursorTrail(): void {
    if (!this.isBrowser) return;
    
    this.mouseMoveHandler = (e: MouseEvent) => {
      if (!this.mouseTrailEnabled || !this.isBrowser) return;

      const dot = this.renderer.createElement('div');
      this.renderer.setStyle(dot, 'position', 'fixed');
      this.renderer.setStyle(dot, 'width', '4px');
      this.renderer.setStyle(dot, 'height', '4px');
      this.renderer.setStyle(dot, 'background', 'rgba(0, 0, 204, 0.08)');
      this.renderer.setStyle(dot, 'border-radius', '50%');
      this.renderer.setStyle(dot, 'pointer-events', 'none');
      this.renderer.setStyle(dot, 'z-index', '9999');
      this.renderer.setStyle(dot, 'left', e.clientX + 'px');
      this.renderer.setStyle(dot, 'top', e.clientY + 'px');
      this.renderer.setStyle(dot, 'animation', 'trailFade 1s ease-out forwards');
      
      this.renderer.appendChild(document.body, dot);
      
      setTimeout(() => {
        if (document.body.contains(dot)) {
          this.renderer.removeChild(document.body, dot);
        }
      }, 1000);
    };
    
    document.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });
  }
}