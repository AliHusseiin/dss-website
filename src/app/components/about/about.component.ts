// about.component.ts
import { 
  Component, 
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  OnDestroy, 
  Inject, 
  PLATFORM_ID,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  computed
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: string;
  progressWidth: number;
  trendValue: string;
}

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface HeroContent {
  ctaText: string;
  ctaLink: string;
}

interface AnimationConfig {
  duration: number;
  delay: number;
  easing: 'ease-out' | 'ease-in-out' | 'linear';
}

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('statsContainer', { static: false }) statsContainer!: ElementRef<HTMLElement>;
  @ViewChild('neuralNetworkContainer', { static: false }) neuralNetworkContainer!: ElementRef<HTMLElement>;
  @ViewChild('counter1', { static: false }) counter1!: ElementRef<HTMLElement>;
  @ViewChild('counter2', { static: false }) counter2!: ElementRef<HTMLElement>;
  @ViewChild('counter3', { static: false }) counter3!: ElementRef<HTMLElement>;

  // Enterprise stats data for DeepSystems
  stats: StatItem[] = [
    {
      id: 'market-penetration',
      value: 54,
      suffix: '%',
      label: 'Market Penetration',
      description: 'AI systems actively deployed across enterprise infrastructure in the Middle East region',
      icon: 'globe',
      progressWidth: 54,
      trendValue: '22%'
    },
    {
      id: 'connected-devices',
      value: 92.71,
      suffix: 'M',
      label: 'Connected Devices',
      description: 'IoT devices and neural network endpoints connected to our deep learning infrastructure',
      icon: 'smartphone',
      progressWidth: 93,
      trendValue: '18%'
    },
    {
      id: 'growth-rate',
      value: 9.4,
      suffix: '%',
      label: 'Growth Rate',
      description: 'Year-over-year expansion in AI model deployment and deep learning system adoption',
      icon: 'trending-up',
      progressWidth: 9,
      trendValue: '9.4%'
    }
  ];

  // DeepSystems enterprise features
  features: FeatureItem[] = [
    {
      icon: 'shield',
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance with international security standards including SOC 2, ISO 27001, and GDPR for complete data protection.'
    },
    {
      icon: 'zap',
      title: 'High Performance',
      description: 'Sub-50ms latency with our globally distributed edge network spanning 15+ data centers for optimal user experience worldwide.'
    },
    {
      icon: 'analytics',
      title: 'Real-time Analytics',
      description: 'Advanced insights and monitoring with custom dashboards, real-time alerts, and predictive analytics for data-driven decisions.'
    },
    {
      icon: 'code',
      title: 'Developer Platform',
      description: 'Comprehensive REST APIs, GraphQL endpoints, and SDKs with extensive documentation and code samples for rapid development.'
    }
  ];

  // Hero content for DeepSystems
  heroContent: HeroContent = {
    ctaText: 'Get Started',
    ctaLink: '/get-started'
  };

  // Animation configuration
  animationConfig: AnimationConfig = {
    duration: 2000,
    delay: 200,
    easing: 'ease-out'
  };

  // Signals for reactive state management
  private animationStarted = signal(false);
  private isVisible = signal(false);
  private neuralNetworkAnimated = signal(false);

  // Computed values
  protected readonly isAnimating = computed(() => 
    this.isVisible() && !this.animationStarted()
  );

  private observer?: IntersectionObserver;
  private neuralObserver?: IntersectionObserver;
  private destroy$ = new Subject<void>();
  private animationFrameIds: number[] = [];
  private neuralAnimationInterval?: number;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    console.log('DeepSystems About Component initialized');
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // Use RAF to ensure DOM is ready
      requestAnimationFrame(() => {
        this.setupIntersectionObserver();
        this.setupNeuralNetworkObserver();
        this.addInteractiveEffects();
      });
    } else {
      // Fallback for SSR
      this.displayFinalValues();
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private setupIntersectionObserver(): void {
    if (!this.isBrowser || !this.statsContainer?.nativeElement) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animationStarted()) {
            this.isVisible.set(true);
            this.startStatsAnimations();
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '50px 0px'
      }
    );

    this.observer.observe(this.statsContainer.nativeElement);
  }

  private setupNeuralNetworkObserver(): void {
    if (!this.isBrowser || !this.neuralNetworkContainer?.nativeElement) {
      return;
    }

    this.neuralObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.neuralNetworkAnimated()) {
            this.neuralNetworkAnimated.set(true);
            this.startNeuralNetworkAnimation();
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '50px 0px'
      }
    );

    this.neuralObserver.observe(this.neuralNetworkContainer.nativeElement);
  }

  private startStatsAnimations(): void {
    if (!this.isBrowser || this.animationStarted()) {
      return;
    }

    this.animationStarted.set(true);

    // Add animate class for progress bars
    setTimeout(() => {
      if (this.statsContainer?.nativeElement) {
        this.startProgressBarAnimations();
      }
    }, 500);

    // Start counter animations with staggered delays
    const counterElements = [
      this.counter1?.nativeElement,
      this.counter2?.nativeElement,
      this.counter3?.nativeElement
    ];

    this.stats.forEach((stat, index) => {
      const delay = this.animationConfig.delay + (index * 200);
      const element = counterElements[index];
      
      setTimeout(() => {
        if (element) {
          this.animateCounter(element, stat.value, stat.suffix, 0);
        }
      }, delay);
    });
  }

  private startProgressBarAnimations(): void {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar: Element, index: number) => {
      setTimeout(() => {
        const htmlBar = bar as HTMLElement;
        const width = htmlBar.getAttribute('data-width');
        if (width) {
          htmlBar.style.width = width + '%';
        }
      }, index * 150);
    });
  }

  private startNeuralNetworkAnimation(): void {
    if (!this.isBrowser) return;

    const nodes = document.querySelectorAll('.node');
    const connections = document.querySelectorAll('.connection');
    
    // Animate nodes appearing
    nodes.forEach((node: Element) => {
      const htmlNode = node as HTMLElement;
      const delay = parseInt(htmlNode.getAttribute('data-delay') || '0');
      setTimeout(() => {
        htmlNode.style.animationDelay = '0s';
        htmlNode.style.opacity = '1';
        htmlNode.style.transform = 'scale(1)';
      }, delay);
    });

    // Animate connections appearing
    connections.forEach((connection: Element) => {
      const htmlConnection = connection as HTMLElement;
      const delay = parseInt(htmlConnection.getAttribute('data-delay') || '0');
      setTimeout(() => {
        htmlConnection.style.animationDelay = '0s';
        htmlConnection.style.opacity = '0.3';
      }, delay);
    });

    // Enhanced activation pattern to simulate "DEEP SYSTEMS" processing
    const activateNetworkSequence = () => {
      // Reset all active states
      nodes.forEach(node => node.classList.remove('active'));
      connections.forEach(conn => conn.classList.remove('active'));

      // Simulate input processing (when letters enter)
      const inputNodes = document.querySelectorAll('.input-node');
      inputNodes.forEach((node: Element, index: number) => {
        setTimeout(() => {
          node.classList.add('active');
          // Activate connected lines
          this.activateConnectedLines(node as HTMLElement);
        }, index * 200);
      });

      // Activate hidden layer processing
      setTimeout(() => {
        const hiddenNodes = document.querySelectorAll('.hidden-node');
        hiddenNodes.forEach((node: Element, index: number) => {
          setTimeout(() => {
            node.classList.add('active');
            this.activateConnectedLines(node as HTMLElement);
          }, index * 150);
        });

        // Activate random connections for visual effect
        const randomConnections = Array.from(connections)
          .sort(() => 0.5 - Math.random()).slice(0, 8);
        randomConnections.forEach((conn: Element, index: number) => {
          setTimeout(() => {
            conn.classList.add('active');
          }, index * 100);
        });
      }, 800);

      // Activate output layer
      setTimeout(() => {
        const outputNodes = document.querySelectorAll('.output-node');
        outputNodes.forEach((node: Element, index: number) => {
          setTimeout(() => {
            node.classList.add('active');
          }, index * 200);
        });
      }, 1500);

      // Clear activation after some time
      setTimeout(() => {
        nodes.forEach(node => node.classList.remove('active'));
        connections.forEach(conn => conn.classList.remove('active'));
      }, 3000);
    };

    // Start the text flow animation cycle
    this.neuralAnimationInterval = window.setInterval(activateNetworkSequence, 6000);
    
    // Initial activation
    setTimeout(activateNetworkSequence, 2000);
  }

  private activateConnectedLines(node: HTMLElement): void {
    const nodeId = node.id;
    const connections = document.querySelectorAll('.connection');
    
    connections.forEach(connection => {
      const htmlConnection = connection as HTMLElement;
      const x1 = htmlConnection.getAttribute('x1');
      const y1 = htmlConnection.getAttribute('y1');
      
      // Simple coordinate matching for line activation
      if (this.isConnectionFromNode(nodeId, x1, y1)) {
        htmlConnection.classList.add('active');
      }
    });
  }

  private isConnectionFromNode(nodeId: string, x1: string | null, y1: string | null): boolean {
    if (!x1 || !y1) return false;
    
    const x = parseInt(x1);
    const y = parseInt(y1);
    
    // Updated coordinate mapping for larger neural network
    const nodeConnections: { [key: string]: { x: number, y: number } } = {
      'input-1': { x: 76, y: 80 },
      'input-2': { x: 76, y: 180 },
      'input-3': { x: 76, y: 280 },
      'hidden-1': { x: 252, y: 60 },
      'hidden-2': { x: 252, y: 120 },
      'hidden-3': { x: 252, y: 180 },
      'hidden-4': { x: 252, y: 240 }
    };
    
    const nodePos = nodeConnections[nodeId];
    return nodePos && Math.abs(nodePos.x - x) < 5 && Math.abs(nodePos.y - y) < 5;
  }

  private animateCounter(
    element: HTMLElement | undefined, 
    target: number, 
    suffix: string = '', 
    startDelay: number = 0
  ): void {
    if (!this.isBrowser || !element) {
      if (element) {
        element.textContent = target.toString() + suffix;
      }
      return;
    }

    const startTime = performance.now() + startDelay;
    const { duration, easing } = this.animationConfig;

    const animate = (currentTime: number) => {
      const elapsed = Math.max(0, currentTime - startTime);
      const progress = Math.min(elapsed / duration, 1);

      if (progress === 0) {
        this.animationFrameIds.push(requestAnimationFrame(animate));
        return;
      }

      const easedProgress = this.applyEasing(progress, easing);
      const currentValue = target * easedProgress;
      
      let displayValue: string;
      if (suffix === '%') {
        displayValue = currentValue.toFixed(currentValue < 10 ? 1 : 0);
      } else if (suffix === 'M') {
        displayValue = currentValue.toFixed(2);
      } else {
        displayValue = currentValue.toFixed(0);
      }
      
      element.textContent = displayValue + suffix;

      if (progress < 1) {
        this.animationFrameIds.push(requestAnimationFrame(animate));
      } else {
        // Ensure final value is exactly the target
        element.textContent = target.toString() + suffix;
      }
    };

    this.animationFrameIds.push(requestAnimationFrame(animate));
  }

  private applyEasing(progress: number, easing: AnimationConfig['easing']): number {
    switch (easing) {
      case 'ease-out':
        return 1 - Math.pow(1 - progress, 3);
      case 'ease-in-out':
        return progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      case 'linear':
      default:
        return progress;
    }
  }

  private addInteractiveEffects(): void {
    if (!this.isBrowser) return;

    // Add interactive hover effects to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
      const cardElement = card as HTMLElement;
      
      cardElement.addEventListener('mouseenter', () => {
        cardElement.style.transform = 'translateY(-8px)';
      });
      
      cardElement.addEventListener('mouseleave', () => {
        cardElement.style.transform = 'translateY(0)';
      });
    });

    // Add feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
      const cardElement = card as HTMLElement;
      
      cardElement.addEventListener('mouseenter', () => {
        cardElement.style.transform = 'translateY(-6px)';
      });
      
      cardElement.addEventListener('mouseleave', () => {
        cardElement.style.transform = 'translateY(0)';
      });
    });
  }

  private displayFinalValues(): void {
    // Set final values for SSR
    const counterElements = [
      this.counter1?.nativeElement,
      this.counter2?.nativeElement,
      this.counter3?.nativeElement
    ];

    this.stats.forEach((stat, index) => {
      const element = counterElements[index];
      if (element) {
        element.textContent = stat.value.toString() + stat.suffix;
      }
    });

    this.animationStarted.set(true);
  }

  private cleanup(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.observer) {
      this.observer.disconnect();
    }

    if (this.neuralObserver) {
      this.neuralObserver.disconnect();
    }

    if (this.neuralAnimationInterval) {
      clearInterval(this.neuralAnimationInterval);
    }

    // Cancel any pending animation frames
    this.animationFrameIds.forEach(id => {
      if (this.isBrowser) {
        cancelAnimationFrame(id);
      }
    });
    this.animationFrameIds = [];
  }

  // Template helper methods
  protected getStatById(id: string): StatItem | undefined {
    return this.stats.find(stat => stat.id === id);
  }

  protected trackByStat(index: number, stat: StatItem): string {
    return stat.id;
  }

  protected trackByFeature(index: number, feature: FeatureItem): string {
    return feature.title;
  }

  // Public API methods
  public resetAnimation(): void {
    if (!this.isBrowser) return;
    
    this.animationStarted.set(false);
    this.isVisible.set(false);
    this.neuralNetworkAnimated.set(false);
    
    // Reset progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
      (bar as HTMLElement).style.width = '0%';
    });

    // Reset neural network
    const nodes = document.querySelectorAll('.node');
    const connections = document.querySelectorAll('.connection');
    nodes.forEach(node => {
      node.classList.remove('active');
      (node as HTMLElement).style.opacity = '0';
      (node as HTMLElement).style.transform = 'scale(0)';
    });
    connections.forEach(conn => {
      conn.classList.remove('active');
      (conn as HTMLElement).style.opacity = '0';
    });
  }

  public triggerAnimation(): void {
    if (!this.animationStarted()) {
      this.startStatsAnimations();
    }
    if (!this.neuralNetworkAnimated()) {
      this.startNeuralNetworkAnimation();
    }
  }

  // Event handlers
  onGetStartedClick(): void {
    console.log('Get Started clicked - DeepSystems enterprise onboarding flow');
  }

  onFeatureHover(feature: FeatureItem): void {
    console.log(`Feature hovered: ${feature.title}`);
  }

  // Template utility methods
  getSafeHtml(html: string): string {
    return html;
  }

  // Scroll to section method
  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Get neural network status
  get isNeuralNetworkActive(): boolean {
    return this.neuralNetworkAnimated();
  }

  // Get animation status
  get isStatsAnimated(): boolean {
    return this.animationStarted();
  }
}