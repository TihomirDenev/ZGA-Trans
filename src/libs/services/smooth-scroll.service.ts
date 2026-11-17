import { Injectable } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { isReducedMotionPreferred, registerGsapPlugins } from '@libs/helpers/animation.helpers';

/**
 * Owns the Lenis smooth scroll instance and keeps GSAP ScrollTrigger in sync with it.
 * Falls back to native scrolling when the user prefers reduced motion.
 */
@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  private lenis: Lenis | null = null;

  init(): void {
    registerGsapPlugins();
    // Stops the pinned sections from jumping when the mobile address bar shows or hides
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (!isReducedMotionPreferred()) {
      this.createLenis();
    }

    this.refreshTriggersWhenPageIsReady();
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    if (this.lenis) {
      // The page may have just changed (e.g. coming from the Privacy Policy), so re-measure
      // its height first — otherwise Lenis stops at the old page's bottom
      this.lenis.resize();
      this.lenis.scrollTo(section, { duration: 1.6, force: true });
      return;
    }

    section.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToTop(): void {
    if (this.lenis) {
      this.lenis.scrollTo(0, { duration: 2 });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /** Instantly back to the top, used when switching pages */
  jumpToTop(): void {
    if (this.lenis) {
      this.lenis.scrollTo(0, { immediate: true, force: true });
      return;
    }

    window.scrollTo(0, 0);
  }

  /** Re-measures every scroll animation, e.g. after a new page has rendered */
  refreshScrollTriggers(): void {
    this.lenis?.resize();
    ScrollTrigger.refresh();
  }

  stop(): void {
    this.lenis?.stop();
  }

  start(): void {
    this.lenis?.start();
  }

  private createLenis(): void {
    this.lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });

    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((timeInSeconds) => this.lenis?.raf(timeInSeconds * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /** Fonts and images change the page height after the first render, so measure again */
  private refreshTriggersWhenPageIsReady(): void {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }
}
