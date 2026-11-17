import { Component, HostListener, inject, signal } from '@angular/core';

import { BrandMarkComponent } from '@libs/components/brand-mark/brand-mark.component';
import { NAV_LINKS } from '@libs/constants/navigation.constants';
import { SiteNavigationService } from '@libs/services/site-navigation.service';
import { SmoothScrollService } from '@libs/services/smooth-scroll.service';

const SCROLLED_THRESHOLD_PX = 40;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BrandMarkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly siteNavigation = inject(SiteNavigationService);

  protected readonly navLinks = NAV_LINKS;
  protected readonly isScrolled = signal(false);
  protected readonly isMenuOpen = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > SCROLLED_THRESHOLD_PX);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  onNavLinkClick(event: Event, sectionId: string): void {
    event.preventDefault();
    this.closeMenu();
    this.siteNavigation.goToSection(sectionId);
  }

  onLogoClick(event: Event): void {
    event.preventDefault();
    this.closeMenu();
    this.siteNavigation.goHome();
  }

  toggleMenu(): void {
    const willOpen = !this.isMenuOpen();

    this.isMenuOpen.set(willOpen);

    if (willOpen) {
      this.smoothScroll.stop();
    } else {
      this.smoothScroll.start();
    }
  }

  private closeMenu(): void {
    if (!this.isMenuOpen()) {
      return;
    }

    this.isMenuOpen.set(false);
    this.smoothScroll.start();
  }
}
