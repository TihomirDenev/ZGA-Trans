import { Component, HostListener, inject, signal } from '@angular/core';

import { BrandMarkComponent } from '@libs/components/brand-mark/brand-mark.component';
import { NAV_LINKS } from '@libs/constants/navigation.constants';
import { SmoothScrollService } from '@libs/services/smooth-scroll.service';

const SCROLLED_THRESHOLD_PX = 40;
const HIDE_AFTER_PX = 400;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BrandMarkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly smoothScroll = inject(SmoothScrollService);

  protected readonly navLinks = NAV_LINKS;
  protected readonly isScrolled = signal(false);
  protected readonly isHidden = signal(false);
  protected readonly isMenuOpen = signal(false);

  private lastScrollY: number = 0;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > this.lastScrollY;

    this.isScrolled.set(currentScrollY > SCROLLED_THRESHOLD_PX);
    this.isHidden.set(isScrollingDown && currentScrollY > HIDE_AFTER_PX && !this.isMenuOpen());
    this.lastScrollY = currentScrollY;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  onNavLinkClick(event: Event, sectionId: string): void {
    event.preventDefault();
    this.closeMenu();
    this.smoothScroll.scrollToSection(sectionId);
  }

  onLogoClick(event: Event): void {
    event.preventDefault();
    this.closeMenu();
    this.smoothScroll.scrollToTop();
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
