import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

import { gsap } from 'gsap';

import { CREDENTIALS } from '@libs/constants/credentials.constants';
import {
  createScopedAnimations,
  isReducedMotionPreferred,
  revealOnScroll,
} from '@libs/helpers/animation.helpers';

/** "Licensed. Insured. Accountable." — the paperwork UK customers check before booking */
@Component({
  selector: 'app-credentials',
  standalone: true,
  templateUrl: './credentials.component.html',
  styleUrl: './credentials.component.scss',
})
export class CredentialsComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly credentials = CREDENTIALS;

  constructor() {
    afterNextRender(() => {
      if (isReducedMotionPreferred()) {
        return;
      }

      createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
        revealOnScroll('.credentials-heading > *', '.credentials');
        this.stampCredentialsIn();
      });
    });
  }

  /** Each badge lands like a stamp on paper */
  private stampCredentialsIn(): void {
    gsap.from('.credential', {
      scale: 1.15,
      opacity: 0,
      rotate: -3,
      stagger: 0.12,
      duration: 0.7,
      ease: 'back.out(2)',
      scrollTrigger: { trigger: '.credentials-grid', start: 'top 85%' },
    });
  }
}
