import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

interface StatItem {
  number: string;
  label: string;
}

@Component({
  selector: 'app-main-about-us',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-about-us.component.html',
  styleUrl: './main-about-us.component.css'
})
export class MainAboutUsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('cosmicBg', { static: true }) cosmicBg!: ElementRef;
  @ViewChild('mouseGlow', { static: true }) mouseGlow!: ElementRef;

  private mouseMoveListener!: (e: MouseEvent) => void;
  private clickListener!: (e: MouseEvent) => void;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  services: ServiceItem[] = [
    {
      title: 'Artificial Intelligence',
      description: 'Revolutionary AI systems that think, learn, and evolve. Neural networks and machine learning algorithms that create intelligent solutions for complex challenges.',
      image: 'https://i.pinimg.com/736x/45/57/a9/4557a9604b6b594295add7e5800801fa.jpg',
    },
    {
      title: 'Embedded Engineering',
      description: 'Precision-crafted embedded systems that power critical infrastructure. From microcontrollers to complex architectures that drive tomorrow\'s technology.',
      image: 'https://i.pinimg.com/736x/79/d2/2c/79d22caeaedf0e4742156063c6410f00.jpg',
    },
    {
      title: 'Software Architecture',
      description: 'Scalable software ecosystems built for the future. Enterprise-grade reliability with seamless technology integration and optimal performance.',
      image: 'https://i.pinimg.com/736x/89/ac/d8/89acd85c7fb7de8e20128f0de084a932.jpg',
    },
    {
      title: 'System Integration',
      description: 'Masterful orchestration of complex technological ecosystems. Connecting and optimizing disparate systems into harmonious, high-performance solutions.',
      image: 'https://i.pinimg.com/736x/06/ac/7d/06ac7d7e5f4f81229e8c7eaf79bd0fef.jpg',
    }
  ];

  getServiceIcon(index: number): string {
    const icons = ['🧠', '⚡', '🔧', '🔗'];
    return icons[index] || '🔧';
  }

  getServiceTags(index: number): string[] {
    const tags = [
      ['ML', 'Neural Networks', 'AI'],
      ['IoT', 'Microcontrollers', 'Hardware'],
      ['Cloud', 'Scalability', 'APIs'],
      ['Networks', 'Optimization', 'Systems']
    ];
    return tags[index] || [];
  }

  stats: StatItem[] = [
    { number: '15+', label: 'Years of<br>Innovation' },
    { number: '200+', label: 'Solutions<br>Delivered' },
    { number: '50+', label: 'Enterprise<br>Partners' },
    { number: '99.9%', label: 'System<br>Reliability' }
  ];

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    // Only run browser-specific code if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.initMouseGlow();
      this.initRippleEffect();
    }
  }

  ngOnDestroy(): void {
    // Only clean up event listeners if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      if (this.mouseMoveListener) {
        document.removeEventListener('mousemove', this.mouseMoveListener);
      }
      if (this.clickListener) {
        document.removeEventListener('click', this.clickListener);
      }
    }
  }

  private initMouseGlow(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const mouseGlow = this.mouseGlow.nativeElement;
    
    this.mouseMoveListener = (e: MouseEvent) => {
      mouseGlow.style.left = (e.clientX - 150) + 'px';
      mouseGlow.style.top = (e.clientY - 150) + 'px';
    };
    
    document.addEventListener('mousemove', this.mouseMoveListener);
  }

  private initRippleEffect(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.clickListener = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - 60) + 'px';
      ripple.style.top = (e.clientY - 60) + 'px';
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 1000);
    };
    
    document.addEventListener('click', this.clickListener);
  }

  onServiceHover(event: MouseEvent, isEntering: boolean): void {
    const target = event.currentTarget as HTMLElement;
    
    if (isEntering) {
      target.style.zIndex = '20';
    } else {
      setTimeout(() => {
        target.style.zIndex = '10';
      }, 300);
    }
  }
}