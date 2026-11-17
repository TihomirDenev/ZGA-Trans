import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

import { FAQ_ITEMS } from '@libs/constants/faq.constants';
import {
  createScopedAnimations,
  isReducedMotionPreferred,
  revealOnScroll,
} from '@libs/helpers/animation.helpers';
import { buildFaqStructuredData } from '@libs/helpers/seo.helpers';
import { SeoService } from '@libs/services/seo.service';

const FAQ_STRUCTURED_DATA_ID = 'faq-structured-data';

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly seo = inject(SeoService);

  protected readonly faqItems = FAQ_ITEMS;

  constructor() {
    // Added during prerendering too, so Google can show these answers in search results
    this.seo.setStructuredData(FAQ_STRUCTURED_DATA_ID, buildFaqStructuredData(FAQ_ITEMS));
    this.destroyRef.onDestroy(() => this.seo.removeStructuredData(FAQ_STRUCTURED_DATA_ID));

    afterNextRender(() => {
      if (isReducedMotionPreferred()) {
        return;
      }

      createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
        revealOnScroll('.faq-heading > *', '.faq');
        revealOnScroll('.faq-item', '.faq-list');
      });
    });
  }
}
