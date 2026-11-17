import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

import { gsap } from 'gsap';

import {
  COVERAGE_CITIES,
  COVERAGE_MAP_VIEW_BOX,
  COVERAGE_REGIONS,
  COVERAGE_ROUTES,
  ENGLAND_OUTLINE_PATH,
} from '@libs/constants/coverage.constants';
import {
  createScopedAnimations,
  isReducedMotionPreferred,
  revealOnScroll,
} from '@libs/helpers/animation.helpers';
import { buildRoutePath } from '@libs/helpers/coverage.helpers';

/** Map of England where the motorway routes draw themselves as you scroll */
@Component({
  selector: 'app-coverage',
  standalone: true,
  templateUrl: './coverage.component.html',
  styleUrl: './coverage.component.scss',
})
export class CoverageComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly mapViewBox = COVERAGE_MAP_VIEW_BOX;
  protected readonly englandOutlinePath = ENGLAND_OUTLINE_PATH;
  protected readonly cities = COVERAGE_CITIES;
  protected readonly regions = COVERAGE_REGIONS;
  protected readonly routes = COVERAGE_ROUTES.map((route) => {
    const routePath = buildRoutePath(route, COVERAGE_CITIES);

    // The CSS offset-path makes a "traffic" dot drive along the same road
    return { ...route, path: routePath, trafficPath: `path('${routePath}')` };
  });
  protected readonly roadNamesText = COVERAGE_ROUTES.map((route) => route.roadName).join(' · ');

  constructor() {
    afterNextRender(() => {
      if (isReducedMotionPreferred()) {
        return;
      }

      createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
        revealOnScroll('.coverage-text > *', '.coverage');
        this.drawRoutesOnScroll();
        this.popCitiesIn();
      });
    });
  }

  private drawRoutesOnScroll(): void {
    gsap.fromTo(
      '.coverage-route',
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '.coverage-map',
          start: 'top 80%',
          end: 'center 45%',
          scrub: 0.6,
        },
      },
    );
  }

  private popCitiesIn(): void {
    gsap.from('.coverage-city', {
      scale: 0,
      opacity: 0,
      transformOrigin: '50% 50%',
      stagger: 0.05,
      duration: 0.5,
      ease: 'back.out(3)',
      scrollTrigger: { trigger: '.coverage-map', start: 'top 75%' },
    });
  }
}
