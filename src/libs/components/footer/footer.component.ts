import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

import { gsap } from 'gsap';

import {
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME,
  COMPANY_PHONE,
  COMPANY_REGISTERED_OFFICE,
  COMPANY_REGISTRATION_NUMBER,
} from '@libs/constants/contact.constants';
import { NAV_LINKS } from '@libs/constants/navigation.constants';
import { createScopedAnimations, isReducedMotionPreferred } from '@libs/helpers/animation.helpers';
import { SmoothScrollService } from '@libs/services/smooth-scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly smoothScroll = inject(SmoothScrollService);

  protected readonly year = new Date().getFullYear();
  protected readonly navLinks = NAV_LINKS;
  protected readonly companyEmail = COMPANY_EMAIL;
  protected readonly companyPhone = COMPANY_PHONE;
  protected readonly companyLegalName = COMPANY_LEGAL_NAME;
  protected readonly companyRegistrationNumber = COMPANY_REGISTRATION_NUMBER;
  protected readonly companyRegisteredOffice = COMPANY_REGISTERED_OFFICE;
  protected readonly companyPhoneLink = `tel:${COMPANY_PHONE.replaceAll(' ', '')}`;

  constructor() {
    afterNextRender(() => {
      if (isReducedMotionPreferred()) {
        return;
      }

      createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
        this.fillBrandWithLight();
      });
    });
  }

  onNavLinkClick(event: Event, sectionId: string): void {
    event.preventDefault();
    this.smoothScroll.scrollToSection(sectionId);
  }

  onBackToTopClick(): void {
    this.smoothScroll.scrollToTop();
  }

  /** The giant brand name fills with electric blue from left to right as the footer scrolls in */
  private fillBrandWithLight(): void {
    gsap.fromTo(
      '.footer-brand-fill',
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        ease: 'none',
        scrollTrigger: { trigger: '.footer', start: 'top 85%', end: 'bottom bottom', scrub: true },
      },
    );
  }
}
