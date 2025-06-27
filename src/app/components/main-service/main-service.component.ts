import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  thumbIcon: string;
  icon: string;
  dataKey: string;
  category: string;
  features: string[];
  isPopular?: boolean;
}

export interface ServiceCategory {
  name: string;
  key: string;
  count: number;
}

@Component({
  selector: 'app-main-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-service.component.html',
  styleUrl: './main-service.component.css'
})
export class MainServiceComponent implements OnInit, AfterViewInit {
  @ViewChild('servicesContainer', { static: false }) servicesContainer!: ElementRef;

  selectedCategory = 'all';
  filteredServices: Service[] = [];
  searchTerm = '';

  categories: ServiceCategory[] = [
    { name: 'All Services', key: 'all', count: 0 },
    { name: 'Technology', key: 'technology', count: 0 },
    { name: 'Integration', key: 'integration', count: 0 },
    { name: 'Security', key: 'security', count: 0 },
    { name: 'Analytics', key: 'analytics', count: 0 },
    { name: 'Infrastructure', key: 'infrastructure', count: 0 },
    { name: 'Support', key: 'support', count: 0 }
  ];

  services: Service[] = [
    {
      id: 'service-1',
      name: 'AI Solutions',
      description: 'Advanced artificial intelligence implementations including machine learning models, natural language processing, and intelligent automation systems to transform your business operations.',
      shortDescription: 'AI & ML solutions for intelligent automation',
      thumbIcon: '/assets/images/others/services/ai.png',
      icon: '/assets/images/others/services/ai-bg.jpg',
      dataKey: 'ai-solutions',
      category: 'technology',
      features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      isPopular: true
    },
    {
      id: 'service-2',
      name: 'Embedded Systems',
      description: 'Custom embedded hardware and software solutions for IoT devices, industrial control systems, and smart infrastructure with real-time processing capabilities.',
      shortDescription: 'IoT and embedded hardware solutions',
      thumbIcon: '/assets/images/others/services/cpu.png',
      icon: '/assets/images/others/services/embedded-bg.jpg',
      dataKey: 'embedded-systems',
      category: 'technology',
      features: ['Real-time Systems', 'IoT Development', 'Industrial Control', 'Edge Computing']
    },
    {
      id: 'service-3',
      name: 'Software Solutions',
      description: 'Full-stack software development, web applications, mobile apps, and cloud-native solutions built with modern technologies and scalable architectures.',
      shortDescription: 'Full-stack development and cloud solutions',
      thumbIcon: '/assets/images/others/services/platform.png',
      icon: '/assets/images/others/services/software-solutions.jpg',
      dataKey: 'software-solutions',
      category: 'technology',
      features: ['Web Development', 'Mobile Apps', 'Cloud-Native', 'API Development'],
      isPopular: true
    },
    {
      id: 'service-4',
      name: 'Systems Integration',
      description: 'Seamless integration of disparate systems, API development, middleware solutions, and enterprise service bus implementations for unified business operations.',
      shortDescription: 'Enterprise system integration and APIs',
      thumbIcon: 'assets/images/others/services/structure.png',
      icon: '/assets/images/others/services/software-integration.jpg',
      dataKey: 'systems-integration',
      category: 'integration',
      features: ['Enterprise Service Bus', 'API Gateway', 'Data Sync', 'Legacy Modernization']
    },
    {
      id: 'service-5',
      name: 'Smart Gates',
      description: 'Intelligent access control systems with biometric authentication, RFID technology, and automated security protocols for enhanced facility management.',
      shortDescription: 'Intelligent access control systems',
      thumbIcon: 'assets/images/others/services/gate.png',
      icon: '/assets/images/others/services/smart-gate-bk.jpg',
      dataKey: 'smart-gates',
      category: 'security',
      features: ['Biometric Auth', 'RFID Access', 'Real-time Monitoring', 'Mobile Integration']
    },
    {
      id: 'service-6',
      name: 'Parking Systems',
      description: 'Smart parking management solutions with automated payment processing, real-time availability tracking, and mobile app integration for optimal space utilization.',
      shortDescription: 'Smart parking management solutions',
      thumbIcon: 'assets/images/others/services/parking.png',
      icon: '/assets/images/others/services/parking-system.jpg',
      dataKey: 'parking-systems',
      category: 'infrastructure',
      features: ['Automated Payments', 'Space Tracking', 'Mobile Apps', 'Analytics Dashboard']
    },
    {
      id: 'service-7',
      name: 'ERP Solutions',
      description: 'Comprehensive enterprise resource planning systems that streamline business processes, improve efficiency, and provide real-time insights across all departments.',
      shortDescription: 'Enterprise resource planning systems',
      thumbIcon: 'assets/images/others/services/erp.png',
      icon: '/assets/images/others/services/erp-system.jpg',
      dataKey: 'erp-solutions',
      category: 'integration',
      features: ['Financial Management', 'Supply Chain', 'HR Management', 'Business Intelligence'],
      isPopular: true
    },
    {
      id: 'service-8',
      name: 'Integration Solutions',
      description: 'Advanced data integration platforms, ETL processes, and real-time synchronization services to connect and harmonize your business ecosystem.',
      shortDescription: 'Data integration and ETL platforms',
      thumbIcon: 'assets/images/others/services/integration.png',
      icon: '/assets/images/others/services/integration-system.jpg',
      dataKey: 'integration-solutions',
      category: 'integration',
      features: ['ETL Processing', 'Real-time Streaming', 'Data Lakes', 'Master Data Management']
    },
    {
      id: 'service-9',
      name: 'Database Management',
      description: 'Professional database design, optimization, migration, and maintenance services ensuring data integrity, performance, and scalability for your applications.',
      shortDescription: 'Database design and optimization services',
      thumbIcon: 'assets/images/others/services/database.png',
      icon: 'assets/images/others/services/database.jpg',
      dataKey: 'database-management',
      category: 'infrastructure',
      features: ['Database Design', 'Performance Optimization', 'Data Migration', '24/7 Monitoring']
    },
    {
      id: 'service-10',
      name: 'Technical Support',
      description: '24/7 comprehensive technical support services, system monitoring, maintenance, and rapid issue resolution to ensure optimal system performance and uptime.',
      shortDescription: '24/7 technical support and monitoring',
      thumbIcon: 'assets/images/others/services/support.png',
      icon: '/assets/images/others/services/technical-support.jpg',
      dataKey: 'technical-support',
      category: 'support',
      features: ['24/7 Support', 'System Monitoring', 'Incident Management', 'Performance Optimization']
    },
    {
      id: 'service-11',
      name: 'Business Intelligence',
      description: 'Advanced analytics, data visualization, and business intelligence solutions that transform raw data into actionable insights for strategic decision-making.',
      shortDescription: 'Data analytics and business intelligence',
      thumbIcon: 'assets/images/others/services/business-intelligence.png',
      icon: '/assets/images/others/services/BI.jpg',
      dataKey: 'business-intelligence',
      category: 'analytics',
      features: ['Data Visualization', 'Predictive Analytics', 'Real-time Reporting', 'Self-Service Analytics'],
      isPopular: true
    },
    {
      id: 'service-12',
      name: 'Network & Security',
      description: 'Comprehensive cybersecurity solutions, network infrastructure design, firewall management, and security audits to protect your digital assets and ensure compliance.',
      shortDescription: 'Cybersecurity and network infrastructure',
      thumbIcon: 'assets/images/others/services/security-system.png',
      icon: '/assets/images/others/services/NS.jpg',
      dataKey: 'network-security',
      category: 'security',
      features: ['Network Design', 'Cybersecurity', 'Firewall Management', 'Security Audits']
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.calculateCategoryCounts();
    this.filterServices();
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  private calculateCategoryCounts(): void {
    this.categories.forEach(category => {
      if (category.key === 'all') {
        category.count = this.services.length;
      } else {
        category.count = this.services.filter(service => service.category === category.key).length;
      }
    });
  }

  filterServices(): void {
    let filtered = this.services;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === this.selectedCategory);
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(term) ||
        service.description.toLowerCase().includes(term) ||
        service.features.some(feature => feature.toLowerCase().includes(term))
      );
    }

    this.filteredServices = filtered;
  }

  onCategoryChange(categoryKey: string): void {
    this.selectedCategory = categoryKey;
    this.filterServices();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.filterServices();
  }

  navigateToService(serviceDataKey: string): void {
    // Simple navigation without router - you can replace this with your preferred method
    window.location.href = `/services/${serviceDataKey}`;
  }

  navigateToContact(): void {
    // Simple navigation without router - you can replace this with your preferred method  
    window.location.href = '/contact';
  }

  getPopularServices(): Service[] {
    return this.services.filter(service => service.isPopular);
  }

  private initializeAnimations(): void {
    // Add entrance animations here if needed
  }

  // Track by functions for performance
  trackByServiceId(index: number, service: Service): string {
    return service.id;
  }

  trackByCategoryKey(index: number, category: ServiceCategory): string {
    return category.key;
  }

  trackByFeature(index: number, feature: string): string {
    return feature;
  }
}