import { afterNextRender, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  PRIVACY_POLICY_LAST_UPDATED,
  PRIVACY_POLICY_SECTIONS,
} from '@libs/constants/privacy-policy.constants';
import { HOME_PATH } from '@libs/constants/routes.constants';
import { PRIVACY_POLICY_PAGE_META } from '@libs/constants/seo.constants';
import { SeoService } from '@libs/services/seo.service';
import { SmoothScrollService } from '@libs/services/smooth-scroll.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
  private readonly seo = inject(SeoService);
  private readonly smoothScroll = inject(SmoothScrollService);

  protected readonly homePath = HOME_PATH;
  protected readonly lastUpdated = PRIVACY_POLICY_LAST_UPDATED;
  protected readonly policySections = PRIVACY_POLICY_SECTIONS;

  constructor() {
    this.seo.updatePageMeta(PRIVACY_POLICY_PAGE_META);
    afterNextRender({ read: () => this.smoothScroll.refreshScrollTriggers() });
  }

  onTableOfContentsClick(event: Event, sectionId: string): void {
    event.preventDefault();
    this.smoothScroll.scrollToSection(sectionId);
  }
}
