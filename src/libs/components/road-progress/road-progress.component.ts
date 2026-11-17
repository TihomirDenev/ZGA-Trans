import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { createScopedAnimations } from '@libs/helpers/animation.helpers';

/** A tiny road on the right edge of the screen. The truck drives down it as the page scrolls. */
@Component({
  selector: 'app-road-progress',
  standalone: true,
  templateUrl: './road-progress.component.html',
  styleUrl: './road-progress.component.scss',
})
export class RoadProgressComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
        this.linkProgressToPageScroll();
      });
    });
  }

  private linkProgressToPageScroll(): void {
    const hostElement = this.elementRef.nativeElement;

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (scrollTrigger) => {
        gsap.set(hostElement, { '--road-progress': scrollTrigger.progress });
      },
    });
  }
}
