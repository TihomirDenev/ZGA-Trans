import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

import { gsap } from 'gsap';

import { FLEET_ITEMS } from '@libs/constants/fleet.constants';
import {
  TRUCK_PHOTO_AVIF_SRCSET,
  TRUCK_PHOTO_FALLBACK_SRC,
  TRUCK_PHOTO_WEBP_SRCSET,
} from '@libs/constants/images.constants';
import {
  createScopedAnimations,
  isReducedMotionPreferred,
  revealOnScroll,
} from '@libs/helpers/animation.helpers';

@Component({
  selector: 'app-fleet',
  standalone: true,
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.scss',
})
export class FleetComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly fleetItems = FLEET_ITEMS;
  protected readonly truckPhotoAvifSrcset = TRUCK_PHOTO_AVIF_SRCSET;
  protected readonly truckPhotoWebpSrcset = TRUCK_PHOTO_WEBP_SRCSET;
  protected readonly truckPhotoFallbackSrc = TRUCK_PHOTO_FALLBACK_SRC;

  constructor() {
    afterNextRender(() => {
      if (isReducedMotionPreferred()) {
        return;
      }

      createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
        revealOnScroll('.fleet-header > *', '.fleet');
        revealOnScroll('.fleet-card', '.fleet-grid');
        this.addPhotoParallax();
      });
    });
  }

  private addPhotoParallax(): void {
    gsap.fromTo(
      '.fleet-photo-image',
      { yPercent: -8, scale: 1.15 },
      {
        yPercent: 8,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.fleet-photo',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  }
}
