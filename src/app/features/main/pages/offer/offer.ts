import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MissionSteps } from '../../components/mission-steps/mission-steps';
import { OpportunityMetrics } from '../../components/opportunity-metrics/opportunity-metrics';
import { StakeholdersEcosystem } from '../../components/stakeholders-ecosystem/stakeholders-ecosystem';
import { InvestmentFocus } from '../../components/investment-focus/investment-focus';
import { InvestmentStructure } from '../../components/investment-structure/investment-structure';

@Component({
  selector: 'app-offer',
  imports: [MissionSteps, OpportunityMetrics, StakeholdersEcosystem, InvestmentFocus, InvestmentStructure],
  templateUrl: './offer.html',
  styleUrl: './offer.scss',
})
export class Offer implements OnInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) { }
  activeSection: string = 'mission';
  private observer?: IntersectionObserver;

  sections: { [key: string]: { title: string; text: string } } = {
    mission: {
      title: 'Mission',
      text: "Athena's mission is to align capital to the next generation of European and transatlantic security innovators, bridging private investors with strategic defense priorities."
    },
    opportunity: {
      title: 'Opportunity',
      text: 'We identify and support emerging companies that are reshaping the defense and security landscape, providing strategic value to both investors and stakeholders.'
    },
    stakeholders: {
      title: 'Core Stakeholders',
      text: 'Our network includes institutional investors, defense industry leaders, government partners, and innovative technology companies working together to strengthen security capabilities.'
    },
    focus: {
      title: 'Investment Focus',
      text: 'We concentrate on dual-use technologies, cybersecurity, AI-driven defense systems, and advanced manufacturing that support both commercial and defense applications.'
    },
    structure: {
      title: 'Investment Structure',
      text: 'Our flexible investment approach combines early-stage venture capital with strategic growth funding, tailored to support companies at different stages of development.'
    }
  };

  ngOnInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  setupIntersectionObserver(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const options = {
      root: null,
      rootMargin: '0px 0px -60% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = (entry.target as HTMLElement).getAttribute('data-section');
          if (section && this.activeSection !== section) {
            this.activeSection = section;
            this.cdr.detectChanges();
          }
        }
      });
    }, options);

    setTimeout(() => {
      const sections = document.querySelectorAll('.about__section');
      sections.forEach(section => {
        if (this.observer) {
          this.observer.observe(section);
        }
      });
    }, 100);
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
