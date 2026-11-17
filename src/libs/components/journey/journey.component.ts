import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { TruckComponent } from '@libs/components/truck/truck.component';
import {
  JOURNEY_ACTIVE_BODY_CLASS,
  JOURNEY_LAMP_COUNT,
  JOURNEY_SCROLL_LENGTH_DESKTOP,
  JOURNEY_SCROLL_LENGTH_PHONE,
  JOURNEY_SCROLL_LENGTH_TABLET,
  JOURNEY_TRUCK_BUMPS,
  JOURNEY_TRUCK_FULL_SPEED_VELOCITY,
  JOURNEY_TRUCK_MAX_LEAD_DESKTOP,
  JOURNEY_TRUCK_MAX_LEAD_PHONE,
  VERGE_PARALLAX_SPEED,
} from '@libs/constants/animation.constants';
import {
  JOURNEY_STEPS,
  SKYLINE_BUILDING_HEIGHTS,
  SKYLINE_BUILDING_WIDTH,
  SKYLINE_VIEW_HEIGHT,
} from '@libs/constants/journey.constants';
import {
  clampNumber,
  createScopedAnimations,
  getWheelRotationForDistance,
  isReducedMotionPreferred,
  revealOnScroll,
} from '@libs/helpers/animation.helpers';
import { buildSkylinePath } from '@libs/helpers/skyline.helpers';

/**
 * Pinned section where the page scroll drives the truck down a night road.
 * The road world slides left, the wheels roll, and each roadside billboard
 * lights up as the truck reaches it.
 */
@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [TruckComponent],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
})
export class JourneyComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly journeySteps = JOURNEY_STEPS;
  protected readonly lampIndexes = Array.from({ length: JOURNEY_LAMP_COUNT }, (_, index) => index);
  protected readonly skylineViewWidth = SKYLINE_BUILDING_HEIGHTS.length * SKYLINE_BUILDING_WIDTH;
  protected readonly skylineViewHeight = SKYLINE_VIEW_HEIGHT;
  protected readonly skylinePath = buildSkylinePath(
    SKYLINE_BUILDING_HEIGHTS,
    SKYLINE_BUILDING_WIDTH,
    SKYLINE_VIEW_HEIGHT,
  );
  protected readonly reachedStepCount = signal(0);
  protected readonly isReducedMotion = signal(false);

  private readonly onScrollTriggerRefresh = (): void => this.matchHeightToVisibleScreen();

  constructor() {
    afterNextRender(() => this.initAnimations());
    this.destroyRef.onDestroy(() => {
      this.markJourneyAsActive(false);
      ScrollTrigger.removeEventListener('refreshInit', this.onScrollTriggerRefresh);
    });
  }

  private initAnimations(): void {
    if (isReducedMotionPreferred()) {
      this.isReducedMotion.set(true);
      this.reachedStepCount.set(this.journeySteps.length);
      return;
    }

    this.matchHeightToVisibleScreen();
    ScrollTrigger.addEventListener('refreshInit', this.onScrollTriggerRefresh);

    createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
      revealOnScroll('.journey-heading > *', '.journey');

      const driveTimeline = this.buildDriveTimeline();
      this.lightUpStopsWhenReached(driveTimeline);
    });
  }

  private buildDriveTimeline(): gsap.core.Timeline {
    const journeyWorld =
      this.elementRef.nativeElement.querySelector<HTMLElement>('.journey-world')!;
    const firstWheel = this.elementRef.nativeElement.querySelector<SVGGElement>('.truck-wheel')!;

    const getDriveDistance = (): number => journeyWorld.offsetWidth - window.innerWidth;
    const getWheelRadius = (): number => firstWheel.getBoundingClientRect().width / 2;
    const getWheelRotation = (): number =>
      getWheelRotationForDistance(getDriveDistance(), getWheelRadius());
    const getScrollLength = (): number => getDriveDistance() * this.getScrollLengthMultiplier();

    const driveTimeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.journey',
        start: 'top top',
        end: () => `+=${getScrollLength()}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onToggle: (scrollTrigger) => this.markJourneyAsActive(scrollTrigger.isActive),
        onUpdate: (scrollTrigger) => this.reactToScrollSpeed(scrollTrigger.getVelocity()),
      },
    });

    driveTimeline
      .to(journeyWorld, { x: () => -getDriveDistance(), duration: 1 }, 0)
      .to(
        '.truck-wheel',
        { rotation: getWheelRotation, transformOrigin: '50% 50%', duration: 1 },
        0,
      )
      .to('.journey-skyline', { xPercent: -30, duration: 1 }, 0)
      .to(
        '.journey-verge',
        { '--verge-offset': () => `${-getDriveDistance() * VERGE_PARALLAX_SPEED}px`, duration: 1 },
        0,
      )
      .to('.journey-progress-fill', { scaleX: 1, duration: 1 }, 0)
      .to(
        '.truck-body',
        {
          y: -2.5,
          duration: 1 / JOURNEY_TRUCK_BUMPS,
          repeat: JOURNEY_TRUCK_BUMPS - 1,
          yoyo: true,
          ease: 'sine.inOut',
        },
        0,
      );

    return driveTimeline;
  }

  private lightUpStopsWhenReached(driveTimeline: gsap.core.Timeline): void {
    const journeyStops = gsap.utils.toArray<HTMLElement>('.journey-stop');

    journeyStops.forEach((journeyStop, stopIndex) => {
      ScrollTrigger.create({
        trigger: journeyStop,
        containerAnimation: driveTimeline,
        start: 'left 62%',
        onEnter: () => this.reachedStepCount.set(stopIndex + 1),
        onLeaveBack: () => this.reachedStepCount.set(stopIndex),
      });
    });
  }

  /**
   * Fast scrolling makes the truck pull ahead and shows speed lines, like a camera that
   * can't keep up. When the scroll stops, the truck eases back to its spot.
   */
  private reactToScrollSpeed(scrollVelocity: number): void {
    const speedShare = clampNumber(scrollVelocity / JOURNEY_TRUCK_FULL_SPEED_VELOCITY, -1, 1);
    const truckLead = speedShare * window.innerWidth * this.getTruckMaxLead();
    const speedLinesOpacity = Math.abs(speedShare);

    gsap.to('.journey-truck', {
      x: truckLead,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
      // Only runs when the scroll has stopped (each new scroll update replaces this tween)
      onComplete: () => {
        this.flashBrakeLights();
        gsap.to('.journey-truck', { x: 0, duration: 1.4, ease: 'power3.inOut', overwrite: 'auto' });
      },
    });

    gsap.to('.journey-speed-lines', {
      opacity: speedLinesOpacity,
      duration: 0.2,
      overwrite: 'auto',
      onComplete: () => {
        gsap.to('.journey-speed-lines', { opacity: 0, duration: 0.8, overwrite: 'auto' });
      },
    });
  }

  /** The truck "brakes" when you stop scrolling: the tail lights flare up, then fade */
  private flashBrakeLights(): void {
    gsap
      .timeline()
      .to('.truck-brake-glow', { opacity: 1, duration: 0.12, overwrite: 'auto' })
      .to('.truck-brake-glow', { opacity: 0, duration: 0.9, delay: 0.6 });
  }

  /**
   * Phone browsers (especially iOS) draw their toolbars over the page, so CSS viewport
   * units can be taller than what you actually see. Measure the visible area instead,
   * so the road and the truck never end up hidden behind the browser's bottom bar.
   */
  private matchHeightToVisibleScreen(): void {
    const visibleScreenHeight = window.visualViewport?.height ?? window.innerHeight;

    this.elementRef.nativeElement.style.setProperty(
      '--journey-height',
      `${Math.round(visibleScreenHeight)}px`,
    );
  }

  private markJourneyAsActive(isActive: boolean): void {
    document.body.classList.toggle(JOURNEY_ACTIVE_BODY_CLASS, isActive);
  }

  private getScrollLengthMultiplier(): number {
    if (this.isPhoneScreen()) {
      return JOURNEY_SCROLL_LENGTH_PHONE;
    }

    if (this.isTabletScreen()) {
      return JOURNEY_SCROLL_LENGTH_TABLET;
    }

    return JOURNEY_SCROLL_LENGTH_DESKTOP;
  }

  private getTruckMaxLead(): number {
    return this.isPhoneScreen() ? JOURNEY_TRUCK_MAX_LEAD_PHONE : JOURNEY_TRUCK_MAX_LEAD_DESKTOP;
  }

  private isPhoneScreen(): boolean {
    return window.matchMedia('(max-width: 599px)').matches;
  }

  private isTabletScreen(): boolean {
    return window.matchMedia('(max-width: 1023px)').matches;
  }
}
