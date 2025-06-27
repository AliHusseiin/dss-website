// main-products.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ProductStats {
  uptime: string;
  support: string;
  clients: string;
}

interface ProductFeature {
  title?: string;
  description?: string;
}

interface ProductDetail {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  features: (string | ProductFeature)[];
  benefits: string[];
  technologies: string[];
  stats?: ProductStats;
  roi?: string;
  implementation?: string;
  icons?: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
  };
}

@Component({
  selector: 'app-main-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-products.component.html',
  styleUrl: './main-products.component.css'
})
export class MainProductsComponent implements OnInit, OnDestroy {
  
  productId: number | null = null;
  product: ProductDetail | null = null;
  showProductDetail: boolean = false;
  isLoading: boolean = false;

  private destroy$ = new Subject<void>();

  private productDetails: ProductDetail[] = [
    {
      id: 1,
      title: 'Enterprise Cloud Solutions',
      category: 'Infrastructure & Platform',
      description: 'Scalable cloud strategies tailored to your enterprise, ensuring maximum efficiency and innovation.',
      longDescription: 'Transform your business with comprehensive enterprise cloud solutions that provide Fortune 500 companies with unmatched flexibility, scalability, and security to thrive in today\'s digital landscape. Our end-to-end cloud migration services, multi-cloud management, and innovative cloud-native development approaches are designed for enterprise scale.',
      image: '/assets/images/vectors/vectornobg1.png',
      features: [
        {
          title: 'Multi-Cloud Architecture',
          description: 'Seamlessly orchestrate across AWS, Azure, and Google Cloud with unified management and monitoring.'
        },
        {
          title: 'Automated CI/CD Pipelines',
          description: 'Accelerate development with intelligent automation and deployment workflows.'
        },
        {
          title: 'Real-time Analytics',
          description: 'Monitor performance and optimize resources with advanced AI-powered insights.'
        },
        {
          title: 'Enterprise Security',
          description: 'Bank-grade security with zero-trust architecture and compliance automation.'
        },
        {
          title: '24/7 Support',
          description: 'Expert technical support and managed services for mission-critical operations.'
        }
      ],
      benefits: [
        'Reduce operational costs by up to 40% within 12 months through intelligent resource optimization and automation',
        'Achieve SOC 2 Type II compliance with enterprise-grade security frameworks and continuous monitoring',
        'Scale seamlessly to support 10x growth with auto-scaling infrastructure and global distribution',
        'Speed up time-to-market by 60% with cloud-native development tools and automated workflows'
      ],
      technologies: ['AWS', 'Microsoft Azure', 'Google Cloud Platform', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Prometheus'],
      stats: {
        uptime: '99.99%',
        support: '24/7',
        clients: '500+'
      },
      roi: '40%',
      implementation: '6-12 weeks',
      icons: {
        primary: '☁️',
        secondary: '🔒',
        tertiary: '⚡',
        quaternary: '🚀'
      }
    },
    {
      id: 2,
      title: 'AI & Machine Learning Platform',
      category: 'Artificial Intelligence',
      description: 'Enterprise-grade intelligent solutions that transform data into actionable insights for strategic business growth.',
      longDescription: 'Harness the power of artificial intelligence and machine learning with our enterprise platform designed for Fortune 1000 companies. Our solutions unlock hidden patterns in your data, automate complex business processes, and enable data-driven decision making that drives measurable ROI and competitive advantage.',
      image: '/assets/images/vectors/vectornobg2.png',
      features: [
        {
          title: 'Custom AI Model Development',
          description: 'Build and deploy custom machine learning models tailored to your business needs.'
        },
        {
          title: 'Natural Language Processing',
          description: 'Extract insights from unstructured text data with advanced NLP capabilities.'
        },
        {
          title: 'Computer Vision Solutions',
          description: 'Automate visual inspection and analysis with state-of-the-art computer vision.'
        },
        {
          title: 'Predictive Analytics',
          description: 'Forecast trends and outcomes with powerful predictive modeling techniques.'
        },
        {
          title: 'Automated Decision Systems',
          description: 'Implement intelligent automation for complex business decision processes.'
        }
      ],
      benefits: [
        'Increase operational efficiency by 65% through intelligent process automation',
        'Reduce manual processing time by 80% with AI-powered workflows',
        'Improve decision accuracy with 95% confidence levels through data-driven insights',
        'Unlock new revenue streams worth $2M+ annually through predictive analytics'
      ],
      technologies: ['TensorFlow Enterprise', 'PyTorch', 'Apache Spark', 'MLflow', 'Kubeflow', 'NVIDIA RAPIDS', 'Azure ML', 'Amazon SageMaker'],
      stats: {
        uptime: '99.95%',
        support: '24/7',
        clients: '250+'
      },
      roi: '65%',
      implementation: '8-16 weeks',
      icons: {
        primary: '🤖',
        secondary: '🧠',
        tertiary: '📊',
        quaternary: '⭐'
      }
    },
    {
      id: 3,
      title: 'Enterprise Cybersecurity Suite',
      category: 'Security & Compliance',
      description: 'Comprehensive security frameworks protecting your digital assets and ensuring business continuity at enterprise scale.',
      longDescription: 'Protect your organization with our enterprise-grade cybersecurity solutions designed to defend against advanced persistent threats, ensure regulatory compliance, and maintain business continuity. Our comprehensive security framework is trusted by global enterprises to safeguard their most critical assets.',
      image: '/assets/images/vectors/vectornobg3.png',
      features: [
        {
          title: 'Advanced Threat Detection',
          description: 'Identify and neutralize threats with AI-powered security monitoring and response.'
        },
        {
          title: 'Zero Trust Architecture',
          description: 'Implement comprehensive zero-trust security model across your entire infrastructure.'
        },
        {
          title: 'Identity & Access Management',
          description: 'Secure user access with advanced IAM solutions and multi-factor authentication.'
        },
        {
          title: 'Security Operations Center',
          description: '24/7 SOC monitoring with expert security analysts and incident response.'
        },
        {
          title: 'Compliance Automation',
          description: 'Automate compliance reporting and maintain regulatory standards effortlessly.'
        }
      ],
      benefits: [
        'Reduce security incidents by 85% with proactive threat detection and response',
        'Ensure 100% regulatory compliance (SOX, GDPR, HIPAA) with automated reporting',
        'Protect intellectual property worth $100M+ with advanced security measures',
        'Minimize breach recovery costs by 90% through rapid incident response'
      ],
      technologies: ['Splunk Enterprise', 'CrowdStrike Falcon', 'Okta', 'Palo Alto Networks', 'Microsoft Sentinel', 'Rapid7', 'Tenable', 'Qualys'],
      stats: {
        uptime: '99.98%',
        support: '24/7',
        clients: '400+'
      },
      roi: '85%',
      implementation: '4-8 weeks',
      icons: {
        primary: '🛡️',
        secondary: '🔐',
        tertiary: '👁️',
        quaternary: '⚡'
      }
    },
    {
      id: 4,
      title: 'Digital Transformation Platform',
      category: 'Business Innovation',
      description: 'End-to-end digital transformation solutions that modernize your business processes and accelerate growth.',
      longDescription: 'Drive enterprise-wide digital transformation with our comprehensive platform that modernizes legacy systems, optimizes business processes, and enables data-driven innovation. Designed for large enterprises ready to embrace the future of business operations.',
      image: '/assets/images/vectors/vectornobg4.png',
      features: [
        {
          title: 'Legacy System Modernization',
          description: 'Transform outdated systems into modern, scalable, cloud-native solutions.'
        },
        {
          title: 'Business Process Automation',
          description: 'Streamline workflows with intelligent automation and process optimization.'
        },
        {
          title: 'Digital Workplace Solutions',
          description: 'Enable remote collaboration with modern digital workplace technologies.'
        },
        {
          title: 'Customer Experience Optimization',
          description: 'Enhance customer journeys with data-driven experience design.'
        },
        {
          title: 'Innovation Framework',
          description: 'Establish systematic innovation processes for continuous business evolution.'
        }
      ],
      benefits: [
        'Accelerate digital initiatives by 70% with proven transformation methodologies',
        'Reduce manual processes by 85% through intelligent automation',
        'Improve customer satisfaction scores by 40% with optimized experiences',
        'Generate $5M+ in new digital revenue streams through innovation'
      ],
      technologies: ['Microsoft Power Platform', 'Salesforce', 'ServiceNow', 'Workday', 'Adobe Experience Cloud', 'Tableau', 'UiPath', 'Automation Anywhere'],
      stats: {
        uptime: '99.96%',
        support: '24/7',
        clients: '300+'
      },
      roi: '70%',
      implementation: '12-24 weeks',
      icons: {
        primary: '🚀',
        secondary: '⚙️',
        tertiary: '💼',
        quaternary: '📈'
      }
    }
  ];

  // Benefit titles mapping
  private benefitTitles = [
    'Reduce Operational Costs',
    'Enhanced Security & Compliance', 
    'Unlimited Scalability',
    'Accelerated Innovation'
  ];

  // Feature descriptions fallback
  private featureDescriptions: { [key: string]: string } = {
    'Multi-Cloud Architecture & Orchestration': 'Seamlessly orchestrate across AWS, Azure, and Google Cloud with unified management and monitoring.',
    'Automated CI/CD Pipelines': 'Accelerate development with intelligent automation and deployment workflows.',
    'Real-time Monitoring & Analytics': 'Monitor performance and optimize resources with advanced AI-powered insights.',
    'Enterprise Security & Compliance': 'Bank-grade security with zero-trust architecture and compliance automation.',
    '24/7 Managed Services & Support': 'Expert technical support and managed services for mission-critical operations.',
    'Custom AI Model Development & Training': 'Build and deploy custom machine learning models tailored to your business needs.',
    'Natural Language Processing Suite': 'Extract insights from unstructured text data with advanced NLP capabilities.',
    'Computer Vision Solutions': 'Automate visual inspection and analysis with state-of-the-art computer vision.',
    'Predictive Analytics & Forecasting': 'Forecast trends and outcomes with powerful predictive modeling techniques.',
    'Automated Decision Management Systems': 'Implement intelligent automation for complex business decision processes.',
    'Advanced Threat Detection & Response': 'Identify and neutralize threats with AI-powered security monitoring and response.',
    'Zero Trust Security Architecture': 'Implement comprehensive zero-trust security model across your entire infrastructure.',
    'Identity & Access Management (IAM)': 'Secure user access with advanced IAM solutions and multi-factor authentication.',
    'Security Operations Center (SOC)': '24/7 SOC monitoring with expert security analysts and incident response.',
    'Incident Response & Business Continuity': 'Rapid incident response and business continuity planning for resilience.',
    'Legacy System Modernization': 'Transform outdated systems into modern, scalable, cloud-native solutions.',
    'Business Process Automation': 'Streamline workflows with intelligent automation and process optimization.',
    'Digital Workplace Solutions': 'Enable remote collaboration with modern digital workplace technologies.',
    'Customer Experience Optimization': 'Enhance customer journeys with data-driven experience design.',
    'Data-Driven Innovation Framework': 'Establish systematic innovation processes for continuous business evolution.'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['id']) {
          this.isLoading = true;
          this.productId = +params['id'];
          
          // Simulate loading time for better UX
          setTimeout(() => {
            this.product = this.productDetails.find(p => p.id === this.productId) || null;
            this.showProductDetail = true;
            this.isLoading = false;
            
            // Track analytics for enterprise insights
            this.trackProductView();
          }, 800);
        } else {
          this.showProductDetail = false;
          this.product = null;
          this.productId = null;
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Navigation methods
  goBack() {
    this.router.navigate(['/products']);
  }

  goToProductsList() {
    this.router.navigate(['/mainproducts']);
  }

  contactUs() {
    // Track conversion for enterprise analytics
    this.trackContactRequest();
    this.router.navigate(['/contact'], { 
      queryParams: { 
        product: this.product?.title,
        category: this.product?.category 
      } 
    });
  }

  // Helper methods for template
  getFormattedIndex(index: number): string {
    return (index + 1).toString().padStart(2, '0');
  }

  getBenefitTitle(benefit: string, index: number): string {
    return this.benefitTitles[index] || `Benefit ${index + 1}`;
  }

  getFeatureDescription(feature: string | ProductFeature): string {
    if (typeof feature === 'object' && feature.description) {
      return feature.description;
    }
    
    const featureText = typeof feature === 'string' ? feature : feature.title || '';
    return this.featureDescriptions[featureText] || 'Advanced enterprise-grade feature designed for maximum efficiency and performance.';
  }

  // Utility methods for enterprise features
  getFormattedROI(): string {
    return this.product?.roi ? `${this.product.roi} improvement` : 'Contact for ROI analysis';
  }

  getImplementationTime(): string {
    return this.product?.implementation || 'Timeline varies by scope';
  }

  isHighValueProduct(): boolean {
    return this.product?.id ? this.product.id <= 2 : false;
  }

  getProductComplexity(): 'Simple' | 'Moderate' | 'Complex' | 'Enterprise' {
    if (!this.product) return 'Simple';
    
    const techCount = this.product.technologies.length;
    if (techCount >= 8) return 'Enterprise';
    if (techCount >= 6) return 'Complex';
    if (techCount >= 4) return 'Moderate';
    return 'Simple';
  }

  getProductIcon(position: 'primary' | 'secondary' | 'tertiary' | 'quaternary' = 'primary'): string {
    if (this.product?.icons) {
      return this.product.icons[position];
    }
    
    // Fallback icons based on category
    const categoryIcons: { [key: string]: { [key: string]: string } } = {
      'Infrastructure & Platform': { primary: '☁️', secondary: '🔒', tertiary: '⚡', quaternary: '🚀' },
      'Artificial Intelligence': { primary: '🤖', secondary: '🧠', tertiary: '📊', quaternary: '⭐' },
      'Security & Compliance': { primary: '🛡️', secondary: '🔐', tertiary: '👁️', quaternary: '⚡' },
      'Business Innovation': { primary: '🚀', secondary: '⚙️', tertiary: '💼', quaternary: '📈' }
    };

    const category = this.product?.category || 'Infrastructure & Platform';
    return categoryIcons[category]?.[position] || '⭐';
  }

  // Enterprise Analytics Tracking Methods
  private trackProductView() {
    if (this.product) {
      console.log(`Product viewed: ${this.product.title} (ID: ${this.productId})`);
      // Implement enterprise analytics tracking
      // Example: gtag('event', 'product_view', { product_id: this.productId });
    }
  }

  private trackContactRequest() {
    console.log(`Contact request initiated from: ${this.product?.title}`);
    // Implement conversion tracking
    // Example: gtag('event', 'contact_request', { product: this.product?.title });
  }

  // Demo and consultation methods (for future use)
  requestDemo() {
    this.trackDemoRequest();
    this.router.navigate(['/demo'], { 
      queryParams: { 
        productId: this.productId,
        source: 'product-detail' 
      } 
    });
  }

  scheduleConsultation() {
    this.trackConsultationRequest();
    this.router.navigate(['/consultation'], { 
      queryParams: { 
        productId: this.productId,
        urgency: 'high' 
      } 
    });
  }

  private trackDemoRequest() {
    console.log(`Demo requested for: ${this.product?.title}`);
    // Implement lead scoring
  }

  private trackConsultationRequest() {
    console.log(`Consultation scheduled for: ${this.product?.title}`);
    // Implement high-value lead tracking
  }

  // Scroll to section method (for smooth scrolling)
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Method to check if feature is expanded feature object
  isExpandedFeature(feature: string | ProductFeature): feature is ProductFeature {
    return typeof feature === 'object' && feature.title !== undefined;
  }

  // Get feature title
  getFeatureTitle(feature: string | ProductFeature): string {
    return this.isExpandedFeature(feature) ? feature.title! : feature;
  }
}