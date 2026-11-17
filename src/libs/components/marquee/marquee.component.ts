import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MARQUEE_BOTTOM_ITEMS, MARQUEE_TOP_ITEMS } from '@libs/constants/marquee.constants';
import {
  clampNumber,
  createScopedAnimations,
  isReducedMotionPreferred,
} from '@libs/helpers/animation.helpers';

const MAX_SPEED_BOOST = 7;
const MAX_SKEW_DEGREES = 8;

/** Two crossing "tapes" of text that speed up, skew and change direction with the scroll */
@Component({
  selector: 'app-marquee',
  standalone: true,
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.scss',
})
export class MarqueeComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly topItems = MARQUEE_TOP_ITEMS;
  protected readonly bottomItems = MARQUEE_BOTTOM_ITEMS;
  /** The text is rendered twice so the loop has no visible gap */
  protected readonly trackCopies = [0, 1];

  constructor() {
    afterNextRender(() => {
      if (isReducedMotionPreferred()) {
        return;
      }

      createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
        this.buildMarqueeLoops();
      });
    });
  }

  private buildMarqueeLoops(): void {
    const topLoop = gsap.to('.marquee-track-top', {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1,
    });
    const bottomLoop = gsap.fromTo(
      '.marquee-track-bottom',
      { xPercent: -50 },
      { xPercent: 0, duration: 34, ease: 'none', repeat: -1 },
    );
    const marqueeLoops = [topLoop, bottomLoop];
    const marqueeTracks = gsap.utils.toArray<HTMLElement>('.marquee-track');

    ScrollTrigger.create({
      trigger: '.marquee',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (scrollTrigger) => {
        const scrollVelocity = scrollTrigger.getVelocity();
        const speedBoost = clampNumber(Math.abs(scrollVelocity) / 250, 1, MAX_SPEED_BOOST);
        const skewDegrees = clampNumber(scrollVelocity / 300, -MAX_SKEW_DEGREES, MAX_SKEW_DEGREES);

        this.boostLoops(marqueeLoops, scrollTrigger.direction, speedBoost);
        this.skewTracks(marqueeTracks, skewDegrees);
      },
    });
  }

  private boostLoops(
    marqueeLoops: gsap.core.Tween[],
    scrollDirection: number,
    speedBoost: number,
  ): void {
    gsap.to(marqueeLoops, {
      timeScale: scrollDirection * speedBoost,
      duration: 0.2,
      overwrite: true,
      onComplete: () => {
        gsap.to(marqueeLoops, { timeScale: scrollDirection, duration: 1.2, overwrite: true });
      },
    });
  }

  private skewTracks(marqueeTracks: HTMLElement[], skewDegrees: number): void {
    gsap.to(marqueeTracks, {
      skewX: -skewDegrees,
      duration: 0.3,
      overwrite: 'auto',
      onComplete: () => {
        gsap.to(marqueeTracks, { skewX: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
      },
    });
  }
}
