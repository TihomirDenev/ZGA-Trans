import { DestroyRef } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// ─── Setup ───────────────────────────────────────────────────────────────────

export function registerGsapPlugins(): void {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export function isReducedMotionPreferred(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Runs `buildAnimations` inside a GSAP context scoped to `scope`, so selectors only
 * match elements inside that component. Everything is reverted when the component is destroyed.
 */
export function createScopedAnimations(
  scope: HTMLElement,
  destroyRef: DestroyRef,
  buildAnimations: () => void,
): void {
  registerGsapPlugins();

  const animationContext = gsap.context(buildAnimations, scope);
  destroyRef.onDestroy(() => animationContext.revert());
}

// ─── Reusable scroll effects ─────────────────────────────────────────────────

/** Fades and lifts elements into place the first time their trigger scrolls into view */
export function revealOnScroll(targets: string, triggerSelector: string): void {
  gsap.from(targets, {
    y: 60,
    opacity: 0,
    stagger: 0.12,
    duration: 1.1,
    ease: 'power4.out',
    scrollTrigger: { trigger: triggerSelector, start: 'top 80%' },
  });
}

// ─── Math ────────────────────────────────────────────────────────────────────

export function getRandomNumberBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** How many degrees a wheel turns when it rolls `distance` pixels without slipping */
export function getWheelRotationForDistance(distance: number, wheelRadius: number): number {
  const wheelCircumference = 2 * Math.PI * wheelRadius;

  return (distance / wheelCircumference) * 360;
}
