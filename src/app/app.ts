import { afterNextRender, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { FooterComponent } from '@libs/components/footer/footer.component';
import { HeaderComponent } from '@libs/components/header/header.component';
import { IntroLoaderComponent } from '@libs/components/intro-loader/intro-loader.component';
import { RoadProgressComponent } from '@libs/components/road-progress/road-progress.component';
import { UpdateBannerComponent } from '@libs/components/update-banner/update-banner.component';
import { AnalyticsService } from '@libs/services/analytics.service';
import { SmoothScrollService } from '@libs/services/smooth-scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    IntroLoaderComponent,
    RoadProgressComponent,
    UpdateBannerComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly analytics = inject(AnalyticsService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.smoothScroll.init();
      this.analytics.init();
      this.jumpToTopOnPageChange();
    });
  }

  /** A new page should always start at the top (the home page then scrolls to #fragments itself) */
  private jumpToTopOnPageChange(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.smoothScroll.jumpToTop());
  }
}
