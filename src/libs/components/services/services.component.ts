import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SERVICES } from '@libs/constants/services.constants';
import {
  createScopedAnimations,
  isReducedMotionPreferred,
  revealOnScroll,
} from '@libs/helpers/animation.helpers';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly services = SERVICES;

  constructor() {
    afterNextRender(() => {
      if (isReducedMotionPreferred()) {
        return;
      }

      createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
        revealOnScroll('.services-header > *', '.services-header');
        this.revealCardsInBatches();
      });
    });
  }

  /** Moves the glowing spotlight inside the card so it follows the mouse */
  onCardPointerMove(event: PointerEvent): void {
    const card = event.currentTarget as HTMLElement;
    const cardBounds = card.getBoundingClientRect();

    card.style.setProperty('--pointer-x', `${event.clientX - cardBounds.left}px`);
    card.style.setProperty('--pointer-y', `${event.clientY - cardBounds.top}px`);
  }

  private revealCardsInBatches(): void {
    gsap.set('.service-card', { opacity: 0, y: 80, rotateX: -14 });

    ScrollTrigger.batch('.service-card', {
      start: 'top 88%',
      once: true,
      onEnter: (cardsInView) => {
        gsap.to(cardsInView, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.12,
          duration: 1.2,
          ease: 'power4.out',
          clearProps: 'transform',
        });
      },
    });
  }
}
