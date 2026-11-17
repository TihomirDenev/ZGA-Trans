import { afterNextRender, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AboutComponent } from '@libs/components/about/about.component';
import { ContactComponent } from '@libs/components/contact/contact.component';
import { CoverageComponent } from '@libs/components/coverage/coverage.component';
import { CredentialsComponent } from '@libs/components/credentials/credentials.component';
import { FaqComponent } from '@libs/components/faq/faq.component';
import { FleetComponent } from '@libs/components/fleet/fleet.component';
import { HeroComponent } from '@libs/components/hero/hero.component';
import { JourneyComponent } from '@libs/components/journey/journey.component';
import { MarqueeComponent } from '@libs/components/marquee/marquee.component';
import { ServicesComponent } from '@libs/components/services/services.component';
import { WhyUsComponent } from '@libs/components/why-us/why-us.component';
import { HOME_PAGE_META } from '@libs/constants/seo.constants';
import { SeoService } from '@libs/services/seo.service';
import { SmoothScrollService } from '@libs/services/smooth-scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    MarqueeComponent,
    ServicesComponent,
    CredentialsComponent,
    JourneyComponent,
    FleetComponent,
    CoverageComponent,
    WhyUsComponent,
    AboutComponent,
    FaqComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly smoothScroll = inject(SmoothScrollService);

  constructor() {
    this.seo.updatePageMeta(HOME_PAGE_META);

    // The "read" phase runs after every section has set up its own scroll animations
    afterNextRender({
      read: () => {
        this.smoothScroll.refreshScrollTriggers();
        this.scrollToRequestedSection();
      },
    });
  }

  /** Coming from another page via e.g. /#contact: land on that section */
  private scrollToRequestedSection(): void {
    const requestedSectionId = this.route.snapshot.fragment;

    if (requestedSectionId) {
      this.smoothScroll.scrollToSection(requestedSectionId);
    }
  }
}
