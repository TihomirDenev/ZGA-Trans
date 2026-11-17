import { Injectable, isDevMode } from '@angular/core';

import { inject as injectVercelAnalytics } from '@vercel/analytics';

/**
 * Cookieless, privacy-friendly page view statistics from Vercel Web Analytics.
 * Turn it on once in the Vercel dashboard (Project → Analytics → Enable).
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  init(): void {
    if (isDevMode()) {
      return;
    }

    injectVercelAnalytics({ framework: 'angular' });
  }
}
