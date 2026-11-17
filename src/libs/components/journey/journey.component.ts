import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { TruckComponent } from '@libs/components/truck/truck.component';
import { JOURNEY_LAMP_COUNT, JOURNEY_TRUCK_BUMPS } from '@libs/constants/animation.constants';
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

  constructor() {
    afterNextRender(() => this.initAnimations());
  }

  private initAnimations(): void {
    if (isReducedMotionPreferred()) {
      this.isReducedMotion.set(true);
      this.reachedStepCount.set(this.journeySteps.length);
      return;
    }

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

    const driveTimeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.journey',
        start: 'top top',
        end: () => `+=${getDriveDistance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (scrollTrigger) => this.showSpeedLines(scrollTrigger.getVelocity()),
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

  private showSpeedLines(scrollVelocity: number): void {
    const speedLinesOpacity = clampNumber(Math.abs(scrollVelocity) / 1800, 0, 1);

    gsap.to('.journey-speed-lines', {
      opacity: speedLinesOpacity,
      duration: 0.2,
      overwrite: 'auto',
      onComplete: () => {
        gsap.to('.journey-speed-lines', { opacity: 0, duration: 0.8, overwrite: 'auto' });
      },
    });
  }
}
