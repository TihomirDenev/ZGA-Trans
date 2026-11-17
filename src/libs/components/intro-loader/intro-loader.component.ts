import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

import { BrandMarkComponent } from '@libs/components/brand-mark/brand-mark.component';
import { INTRO_DURATION_SECONDS } from '@libs/constants/animation.constants';
import { createScopedAnimations, isReducedMotionPreferred } from '@libs/helpers/animation.helpers';
import { SmoothScrollService } from '@libs/services/smooth-scroll.service';

@Component({
  selector: 'app-intro-loader',
  standalone: true,
  imports: [BrandMarkComponent],
  templateUrl: './intro-loader.component.html',
  styleUrl: './intro-loader.component.scss',
})
export class IntroLoaderComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly smoothScroll = inject(SmoothScrollService);

  protected readonly isFinished = signal(false);

  constructor() {
    afterNextRender(() => this.playIntro());
  }

  private playIntro(): void {
    this.resetScrollPosition();

    if (isReducedMotionPreferred()) {
      this.isFinished.set(true);
      return;
    }

    this.smoothScroll.stop();

    createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
      this.buildIntroTimeline();
    });
  }

  private buildIntroTimeline(): void {
    const brandLetters = SplitText.create('.intro-brand', { type: 'chars' });
    const exitStartTime = INTRO_DURATION_SECONDS - 0.8;

    const introTimeline = gsap.timeline({
      defaults: { ease: 'power4.out' },
      onComplete: () => this.finishIntro(),
    });

    introTimeline
      .from('.brand-mark-stroke', {
        strokeDashoffset: 1,
        stagger: 0.18,
        duration: 0.6,
        ease: 'power2.inOut',
      })
      .from(
        '.brand-mark-spark',
        { scale: 0, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' },
        '-=0.3',
      )
      .from(brandLetters.chars, { yPercent: 110, stagger: 0.04, duration: 0.8 }, 0.2)
      .from('.intro-tagline', { opacity: 0, y: 12, duration: 0.6 }, 0.6)
      .fromTo(
        '.intro-progress-fill',
        { scaleX: 0 },
        { scaleX: 1, duration: exitStartTime - 0.1, ease: 'power2.inOut' },
        0,
      )
      .to(
        '.intro-flash',
        { opacity: 1, duration: 0.06, yoyo: true, repeat: 1 },
        exitStartTime - 0.1,
      )
      .to(
        '.intro-content',
        { scale: 0.92, opacity: 0, duration: 0.5, ease: 'power2.in' },
        exitStartTime,
      )
      .to('.intro-loader', { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, exitStartTime);
  }

  private finishIntro(): void {
    this.isFinished.set(true);
    this.smoothScroll.start();
  }

  private resetScrollPosition(): void {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }
}
