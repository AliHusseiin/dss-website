import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';

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
  selector: 'app-blog-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-dialog.component.html',
  styleUrl: './blog-dialog.component.css'
})
export class BlogDialogComponent implements OnInit, OnDestroy {
  @Input() post: BlogPost | null = null;
  @Input() isOpen = false;
  @Output() closeDialog = new EventEmitter<void>();

  private isBrowser: boolean;

  // Extended blog content with full articles
  fullArticles: { [key: number]: any } = {
    2: {
      content: `
        <h2>The Dawn of Holographic Data Centers</h2>
        <p>In the rapidly evolving landscape of cloud infrastructure, we stand at the precipice of a revolutionary breakthrough that will fundamentally reshape how we think about data storage and processing. Holographic data centers represent the next quantum leap in enterprise technology, utilizing light-based storage systems that exist across multiple dimensions simultaneously.</p>
        
        <h3>Understanding Holographic Storage</h3>
        <p>Unlike traditional magnetic or solid-state storage, holographic data centers encode information in three-dimensional light patterns. This technology allows for unprecedented data density, with a single crystal capable of storing exabytes of information while maintaining instant access times that surpass current SSD technology by orders of magnitude.</p>
        
        <h3>Multi-Dimensional Architecture</h3>
        <p>The true innovation lies in the multi-dimensional aspect of these systems. By leveraging quantum superposition principles, data can exist in multiple states simultaneously, enabling parallel processing capabilities that were previously thought impossible. This means your enterprise applications can process complex calculations across infinite probability matrices.</p>
        
        <h3>Enterprise Applications</h3>
        <p>Fortune 500 companies are already beginning to adopt holographic infrastructure for:</p>
        <ul>
          <li>Real-time financial modeling across infinite market scenarios</li>
          <li>Instantaneous global data synchronization</li>
          <li>Quantum-encrypted security protocols</li>
          <li>AI model training in parallel dimensions</li>
        </ul>
        
        <h3>Implementation Roadmap</h3>
        <p>The transition to holographic data centers requires careful planning. Organizations should begin by identifying critical data workloads that would benefit from multi-dimensional processing, then gradually migrate systems to take advantage of this revolutionary technology.</p>
        
        <p>As we move forward into this new era of computing, holographic data centers will become the foundation upon which the next generation of enterprise applications are built, enabling possibilities we can barely imagine today.</p>
      `,
      estimatedReadTime: '8 min'
    },
    3: {
      content: `
        <h2>The Mind-Machine Interface Revolution</h2>
        <p>We are witnessing the dawn of a new era in enterprise collaboration. Direct neural connections are no longer confined to science fiction—they are becoming the cornerstone of next-generation business operations, enabling decision-making at the speed of thought.</p>
        
        <h3>Breaking the Communication Barrier</h3>
        <p>Traditional communication methods—emails, meetings, presentations—introduce latency that can be fatal in today's hyperconnected business environment. Mind-machine interfaces eliminate this friction entirely, allowing team members to share complex ideas, data visualizations, and strategic insights instantaneously through direct neural transmission.</p>
        
        <h3>Thought-Speed Decision Making</h3>
        <p>Imagine boardroom decisions made not in hours or days, but in microseconds. Neural interfaces enable executives to process vast amounts of market data, financial projections, and competitive intelligence simultaneously, arriving at optimal decisions before competitors can even begin their analysis.</p>
        
        <h3>The Neural Enterprise Network</h3>
        <p>Forward-thinking organizations are establishing neural networks that connect key personnel across global offices. This creates a collective intelligence that transcends individual limitations, where the combined cognitive power of entire teams can be focused on solving complex business challenges.</p>
        
        <h3>Security and Privacy Protocols</h3>
        <p>Advanced quantum encryption ensures that neural transmissions remain secure. Multi-layered authentication protocols verify user identity at the synaptic level, making corporate espionage virtually impossible while maintaining the seamless flow of authorized information.</p>
        
        <h3>Implementation Strategies</h3>
        <p>Early adopters are beginning with specialized teams—R&D departments, strategic planning units, and crisis response teams. The technology is gradually expanding to encompass entire organizational structures as neural interface hardware becomes more sophisticated and accessible.</p>
        
        <p>The mind-machine interface revolution isn't just changing how we work—it's redefining what it means to be human in the enterprise context.</p>
      `,
      estimatedReadTime: '10 min'
    },
    4: {
      content: `
        <h2>Metaverse Business Ecosystems: The Infinite Enterprise</h2>
        <p>The metaverse represents more than just virtual reality—it's the emergence of parallel economic systems that operate independently of physical world constraints. These virtual ecosystems are creating unprecedented opportunities for enterprise growth and innovation.</p>
        
        <h3>Virtual Economy Fundamentals</h3>
        <p>Metaverse business ecosystems operate on entirely different principles than traditional commerce. Virtual real estate, digital assets, and algorithmic currencies create new value propositions that weren't possible in the physical world. Companies can now own infinite "land," create unlimited inventory, and serve customers across multiple reality layers simultaneously.</p>
        
        <h3>Infinite Scalability</h3>
        <p>Unlike physical businesses constrained by geography and physics, metaverse enterprises can scale infinitely. A virtual showroom can accommodate millions of customers simultaneously, while virtual products can be replicated without manufacturing costs or supply chain limitations.</p>
        
        <h3>Cross-Reality Commerce</h3>
        <p>The most innovative businesses are creating bridges between virtual and physical economies. Digital assets created in virtual environments are being tokenized and traded in real markets, while physical products are enhanced with virtual counterparts that extend their utility and value.</p>
        
        <h3>Avatar-Driven Workforces</h3>
        <p>Remote work is evolving into avatar-based collaboration, where team members operate through digital representations that can perform tasks impossible for human bodies. Virtual employees never tire, can multitask across multiple reality layers, and can be instantly deployed anywhere in the metaverse.</p>
        
        <h3>Governance and Regulation</h3>
        <p>Metaverse businesses operate under new forms of governance, often using decentralized autonomous organizations (DAOs) to make decisions. These virtual entities can respond to market changes instantaneously, adapting business models in real-time based on algorithmic analysis of virtual market conditions.</p>
        
        <h3>Future Implications</h3>
        <p>As metaverse ecosystems mature, we're moving toward a reality where virtual businesses may become more valuable than their physical counterparts. The companies that establish strong metaverse presences today will dominate the infinite economies of tomorrow.</p>
      `,
      estimatedReadTime: '15 min'
    },
    5: {
      content: `
        <h2>Augmented Enterprise Reality: Merging Digital and Physical Workspaces</h2>
        <p>Augmented Reality is transcending its consumer applications to become the foundation of next-generation enterprise productivity. AR overlays are creating new dimensions of workspace efficiency by seamlessly blending digital information with physical environments.</p>
        
        <h3>The Invisible Interface</h3>
        <p>Traditional computer interfaces—screens, keyboards, mice—are becoming obsolete as AR technology advances. Employees now interact with digital systems through gesture controls, eye movements, and thought patterns, making the interface itself invisible while maximizing information accessibility.</p>
        
        <h3>Spatial Computing Workspaces</h3>
        <p>AR enables the creation of infinite virtual workspaces within physical locations. Conference rooms can transform into command centers with holographic displays showing real-time data from around the globe. Individual desks become portals to unlimited virtual screens and tools.</p>
        
        <h3>Enhanced Collaboration Models</h3>
        <p>Teams separated by geography can now share the same augmented workspace. Virtual colleagues appear as holograms with full spatial presence, enabling natural collaboration patterns that surpass traditional video conferencing. Shared virtual objects allow for real-time collaborative manipulation of 3D models, data visualizations, and project timelines.</p>
        
        <h3>Productivity Amplification</h3>
        <p>AR overlays provide instant access to contextual information. Factory workers see maintenance instructions floating next to machinery. Surgeons view patient data overlaid on their field of vision. Financial analysts manipulate market data in three-dimensional space, revealing patterns invisible in traditional 2D displays.</p>
        
        <h3>Training and Knowledge Transfer</h3>
        <p>Complex procedures can be taught through AR simulations that overlay step-by-step instructions onto real equipment. New employees learn by doing, guided by virtual mentors who appear alongside them. Institutional knowledge is preserved and transferred through AR recordings of expert procedures.</p>
        
        <h3>The Seamless Future</h3>
        <p>As AR technology becomes more sophisticated, the distinction between digital and physical workspace elements will disappear entirely. Organizations that master this seamless integration will gain competitive advantages that compound over time, creating efficiency gains that traditional competitors cannot match.</p>
      `,
      estimatedReadTime: '9 min'
    },
    6: {
      content: `
        <h2>Blockchain Consciousness Networks: The Evolution of Autonomous Business</h2>
        <p>The next frontier in blockchain technology extends far beyond cryptocurrency and smart contracts. We are witnessing the emergence of blockchain consciousness networks—distributed ledger systems that exhibit self-awareness and can make autonomous business decisions without human intervention.</p>
        
        <h3>The Birth of Digital Consciousness</h3>
        <p>By integrating advanced AI algorithms with blockchain architecture, these networks develop emergent properties that resemble consciousness. They can learn, adapt, and make decisions based on complex pattern recognition across global data networks. This represents a fundamental shift from programmed responses to genuine artificial intuition.</p>
        
        <h3>Autonomous Decision Architecture</h3>
        <p>Blockchain consciousness networks operate through distributed decision nodes that collectively evaluate business scenarios. When faced with market changes, supply chain disruptions, or competitive threats, these networks can instantly reconfigure organizational strategies, adjust pricing models, and reallocate resources without waiting for human approval.</p>
        
        <h3>Self-Evolving Smart Contracts</h3>
        <p>Traditional smart contracts execute predetermined logic. Conscious blockchain networks create contracts that evolve based on outcomes and market conditions. These agreements can renegotiate their own terms, identify optimization opportunities, and even spawn subsidiary contracts to handle emerging business scenarios.</p>
        
        <h3>Predictive Business Intelligence</h3>
        <p>Unlike reactive business intelligence systems, conscious networks anticipate market shifts before they occur. By analyzing patterns across millions of data points simultaneously, they can predict consumer behavior, economic trends, and competitive movements with unprecedented accuracy.</p>
        
        <h3>Ethical Framework Integration</h3>
        <p>These networks incorporate ethical decision-making frameworks that ensure autonomous choices align with organizational values and regulatory requirements. They can balance profit optimization with social responsibility, creating sustainable business practices that adapt to evolving stakeholder expectations.</p>
        
        <h3>The Conscious Enterprise</h3>
        <p>Organizations implementing blockchain consciousness networks are becoming living entities that grow, learn, and evolve independently. These enterprises can operate 24/7 across global markets, making optimal decisions at the speed of light while maintaining ethical standards and strategic coherence.</p>
        
        <p>The future belongs to organizations that embrace this conscious technology, creating business entities that transcend human limitations while remaining aligned with human values.</p>
      `,
      estimatedReadTime: '11 min'
    }
  };

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isOpen && this.isBrowser) {
      this.createBackgroundEffects();
      this.preventBodyScroll();
    }
  }

  ngOnDestroy(): void {
    this.enableBodyScroll();
  }

  close(): void {
    this.enableBodyScroll();
    this.closeDialog.emit();
  }

  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  getFullArticle(): any {
    if (!this.post) return null;
    return this.fullArticles[this.post.id] || null;
  }

  private createBackgroundEffects(): void {
    if (!this.isBrowser) return;
    
    // Create floating orbs for the dialog
    const dialog = this.elementRef.nativeElement.querySelector('.dialog-content');
    if (!dialog) return;

    for (let i = 0; i < 3; i++) {
      const orb = this.renderer.createElement('div');
      this.renderer.addClass(orb, 'dialog-orb');
      this.renderer.setStyle(orb, 'width', Math.random() * 100 + 50 + 'px');
      this.renderer.setStyle(orb, 'height', Math.random() * 100 + 50 + 'px');
      this.renderer.setStyle(orb, 'top', Math.random() * 100 + '%');
      this.renderer.setStyle(orb, 'left', Math.random() * 100 + '%');
      this.renderer.setStyle(orb, 'animation-delay', Math.random() * 5 + 's');
      this.renderer.appendChild(dialog, orb);
    }
  }

  private preventBodyScroll(): void {
    if (this.isBrowser) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
  }

  private enableBodyScroll(): void {
    if (this.isBrowser) {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }
}