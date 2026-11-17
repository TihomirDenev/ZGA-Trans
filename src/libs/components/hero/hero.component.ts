import {
  afterNextRender,
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  HostListener,
  inject,
  viewChild,
} from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import {
  INTRO_DURATION_SECONDS,
  LIGHTNING_MAX_DELAY_SECONDS,
  LIGHTNING_MIN_DELAY_SECONDS,
} from '@libs/constants/animation.constants';
import {
  TRUCK_PHOTO_AVIF_SRCSET,
  TRUCK_PHOTO_FALLBACK_SRC,
  TRUCK_PHOTO_WEBP_SRCSET,
} from '@libs/constants/images.constants';
import {
  createScopedAnimations,
  getRandomNumberBetween,
  isReducedMotionPreferred,
} from '@libs/helpers/animation.helpers';
import { buildLightningStrike, drawLightningStrike } from '@libs/helpers/lightning.helpers';
import { LightningBranch } from '@libs/models/lightning.model';
import { IntroStateService } from '@libs/services/intro-state.service';
import { SmoothScrollService } from '@libs/services/smooth-scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly introState = inject(IntroStateService);
  private readonly lightningCanvas =
    viewChild.required<ElementRef<HTMLCanvasElement>>('lightningCanvas');

  private canvasContext: CanvasRenderingContext2D | null = null;
  private isHeroVisible: boolean = true;
  protected readonly truckPhotoAvifSrcset = TRUCK_PHOTO_AVIF_SRCSET;
  protected readonly truckPhotoWebpSrcset = TRUCK_PHOTO_WEBP_SRCSET;
  protected readonly truckPhotoFallbackSrc = TRUCK_PHOTO_FALLBACK_SRC;

  private nextLightningStrike: gsap.core.Tween | null = null;

  constructor() {
    this.preloadHeroImage();
    afterNextRender(() => this.initAnimations());
    this.destroyRef.onDestroy(() => this.nextLightningStrike?.kill());
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.resizeLightningCanvas();
  }

  onSectionLinkClick(event: Event, sectionId: string): void {
    event.preventDefault();
    this.smoothScroll.scrollToSection(sectionId);
  }

  /**
   * Tells the browser to start downloading the hero photo straight away. Added from here
   * (and prerendered) so only the home page preloads it, not the Privacy Policy or 404 page.
   */
  private preloadHeroImage(): void {
    const isAlreadyPreloaded = this.document.head.querySelector('link[data-hero-preload]');

    if (isAlreadyPreloaded) {
      return;
    }

    const preloadLink = this.document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.type = 'image/avif';
    preloadLink.setAttribute('imagesrcset', TRUCK_PHOTO_AVIF_SRCSET);
    preloadLink.setAttribute('imagesizes', '100vw');
    preloadLink.setAttribute('fetchpriority', 'high');
    preloadLink.setAttribute('data-hero-preload', '');
    this.document.head.appendChild(preloadLink);
  }

  private initAnimations(): void {
    if (isReducedMotionPreferred()) {
      return;
    }

    createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
      this.buildEntranceTimeline();
      this.buildScrollParallax();
    });

    this.startLightning();
  }

  // ─── Entrance ──────────────────────────────────────────────────────────────

  private buildEntranceTimeline(): void {
    const titleLetters = SplitText.create('.hero-title-split', { type: 'chars', aria: 'hidden' });
    // Wait for the intro loader on the first visit; coming back from another page, start right away
    const entranceDelay = this.introState.isIntroFinished() ? 0.1 : INTRO_DURATION_SECONDS - 0.6;

    gsap
      .timeline({ delay: entranceDelay, defaults: { ease: 'power4.out' } })
      .from('.hero-image', { scale: 1.35, opacity: 0, duration: 2.2, ease: 'expo.out' })
      .from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8 }, 0.3)
      .from(
        titleLetters.chars,
        { yPercent: 120, rotateX: -80, opacity: 0, stagger: 0.035, duration: 1.1 },
        0.35,
      )
      .from('.hero-title-accent', { opacity: 0, x: -40, filter: 'blur(14px)', duration: 1 }, 0.8)
      .from('.hero-arrow', { x: '-110vw', duration: 0.9, ease: 'power3.in' }, 1)
      .to('.hero-title-accent', { x: 6, duration: 0.08, yoyo: true, repeat: 3, ease: 'none' }, 1.9)
      .from('.hero-description', { opacity: 0, y: 30, duration: 0.9 }, 1.1)
      .from('.hero-actions .button', { opacity: 0, y: 30, stagger: 0.1, duration: 0.9 }, 1.2)
      .from('.hero-scroll-hint', { opacity: 0, duration: 1 }, 1.5)
      .add(() => this.strikeLightning(), 1.9);
  }

  // ─── Scroll ────────────────────────────────────────────────────────────────

  private buildScrollParallax(): void {
    const scrollSettings = {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    };

    gsap.to('.hero-media', {
      yPercent: 25,
      scale: 1.12,
      ease: 'none',
      scrollTrigger: scrollSettings,
    });
    gsap.to('.hero-content', {
      yPercent: -35,
      opacity: 0,
      ease: 'none',
      scrollTrigger: scrollSettings,
    });
    gsap.to('.hero-scroll-hint', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: { ...scrollSettings, end: '20% top' },
    });

    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      onToggle: (scrollTrigger) => (this.isHeroVisible = scrollTrigger.isActive),
    });
  }

  // ─── Lightning ─────────────────────────────────────────────────────────────

  private startLightning(): void {
    this.canvasContext = this.lightningCanvas().nativeElement.getContext('2d');
    this.resizeLightningCanvas();
    this.scheduleNextLightningStrike();
  }

  private scheduleNextLightningStrike(): void {
    const delayInSeconds = getRandomNumberBetween(
      LIGHTNING_MIN_DELAY_SECONDS,
      LIGHTNING_MAX_DELAY_SECONDS,
    );

    this.nextLightningStrike = gsap.delayedCall(delayInSeconds, () => {
      this.strikeLightning();
      this.scheduleNextLightningStrike();
    });
  }

  private strikeLightning(): void {
    const canvas = this.lightningCanvas().nativeElement;

    if (!this.isHeroVisible || !this.canvasContext) {
      return;
    }

    const lightningBranches = buildLightningStrike(canvas.clientWidth, canvas.clientHeight);
    const flicker = { opacity: 0 };

    gsap
      .timeline({ onUpdate: () => this.redrawLightning(lightningBranches, flicker.opacity) })
      .to(flicker, { opacity: 1, duration: 0.04 })
      .to(flicker, { opacity: 0.2, duration: 0.07 })
      .to(flicker, { opacity: 1, duration: 0.04 })
      .to(flicker, { opacity: 0, duration: 0.7, ease: 'power2.out' });

    gsap.fromTo(
      '.hero-flash',
      { opacity: 0.22 },
      { opacity: 0, duration: 0.9, ease: 'power2.out' },
    );
  }

  private redrawLightning(lightningBranches: LightningBranch[], opacity: number): void {
    const canvas = this.lightningCanvas().nativeElement;

    if (!this.canvasContext) {
      return;
    }

    this.canvasContext.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    drawLightningStrike(this.canvasContext, lightningBranches, opacity);
  }

  private resizeLightningCanvas(): void {
    const canvas = this.lightningCanvas().nativeElement;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    canvas.width = canvas.clientWidth * pixelRatio;
    canvas.height = canvas.clientHeight * pixelRatio;
    this.canvasContext?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }
}
