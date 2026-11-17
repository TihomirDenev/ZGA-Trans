import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { HOME_PATH } from '@libs/constants/routes.constants';
import { SmoothScrollService } from '@libs/services/smooth-scroll.service';

/**
 * Navigation that works from any page: on the home page it smooth-scrolls to a section,
 * on other pages (e.g. Privacy Policy) it goes home first and lands on that section.
 */
@Injectable({ providedIn: 'root' })
export class SiteNavigationService {
  private readonly router = inject(Router);
  private readonly smoothScroll = inject(SmoothScrollService);

  goToSection(sectionId: string): void {
    if (this.isOnHomePage()) {
      this.smoothScroll.scrollToSection(sectionId);
      return;
    }

    this.router.navigate([HOME_PATH], { fragment: sectionId });
  }

  goHome(): void {
    if (this.isOnHomePage()) {
      this.smoothScroll.scrollToTop();
      return;
    }

    this.router.navigate([HOME_PATH]);
  }

  private isOnHomePage(): boolean {
    const currentPath = this.router.url.split('#')[0];

    return currentPath === HOME_PATH;
  }
}
