import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

import { gsap } from 'gsap';

import { BrandMarkComponent } from '@libs/components/brand-mark/brand-mark.component';
import {
  ABOUT_PARAGRAPHS,
  ABOUT_QUOTE,
  ABOUT_QUOTE_AUTHOR,
  COMPANY_VALUES,
} from '@libs/constants/about.constants';
import {
  createScopedAnimations,
  isReducedMotionPreferred,
  revealOnScroll,
} from '@libs/helpers/animation.helpers';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BrandMarkComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly paragraphs = ABOUT_PARAGRAPHS;
  protected readonly quote = ABOUT_QUOTE;
  protected readonly quoteAuthor = ABOUT_QUOTE_AUTHOR;
  protected readonly companyValues = COMPANY_VALUES;

  constructor() {
    afterNextRender(() => {
      if (isReducedMotionPreferred()) {
        return;
      }

      createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
        revealOnScroll('.about-content > *', '.about');
        this.floatEmblemCard();
      });
    });
  }

  /** Desktop only: on smaller screens the card sits right above the text and would overlap it */
  private floatEmblemCard(): void {
    const isDesktopScreen = window.matchMedia('(min-width: 1024px)').matches;

    if (!isDesktopScreen) {
      return;
    }

    gsap.fromTo(
      '.about-emblem-card',
      { y: 60, rotate: -2 },
      {
        y: -40,
        rotate: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  }
}
