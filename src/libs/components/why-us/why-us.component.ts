import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

import { gsap } from 'gsap';

import { TyreComponent } from '@libs/components/tyre/tyre.component';
import { BIG_TYRE_TURNS } from '@libs/constants/animation.constants';
import { STATS, WHY_US_MANIFESTO } from '@libs/constants/why-us.constants';
import {
  createScopedAnimations,
  isReducedMotionPreferred,
  revealOnScroll,
} from '@libs/helpers/animation.helpers';
import { ManifestoWord } from '@libs/models/manifesto-word.model';

const ACCENT_WORD_COUNT = 4;

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [TyreComponent],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss',
})
export class WhyUsComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly stats = STATS;
  protected readonly manifestoWords = this.buildManifestoWords();

  constructor() {
    afterNextRender(() => {
      if (isReducedMotionPreferred()) {
        return;
      }

      createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
        revealOnScroll('.eyebrow', '.why-us');
        this.rollTyreWithScroll();
        this.lightUpManifestoWords();
        this.countUpStats();
      });
    });
  }

  /** Splits the manifesto into words; the last few words ("Straight to your goals.") get the accent */
  private buildManifestoWords(): ManifestoWord[] {
    const words = WHY_US_MANIFESTO.split(' ');
    const firstAccentIndex = words.length - ACCENT_WORD_COUNT;

    return words.map((word, index) => ({ text: word, isAccent: index >= firstAccentIndex }));
  }

  private rollTyreWithScroll(): void {
    gsap.fromTo(
      '.why-us-tyre',
      { rotation: 0, yPercent: -6 },
      {
        rotation: 360 * BIG_TYRE_TURNS,
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: '.why-us', start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  }

  private lightUpManifestoWords(): void {
    gsap.fromTo(
      '.manifesto-word',
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: '.manifesto', start: 'top 80%', end: 'bottom 50%', scrub: true },
      },
    );
  }

  private countUpStats(): void {
    gsap.from('.stat-number', {
      textContent: 0,
      snap: { textContent: 1 },
      duration: 2,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: { trigger: '.stats', start: 'top 85%' },
    });

    gsap.from('.stat', {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.stats', start: 'top 85%' },
    });
  }
}
