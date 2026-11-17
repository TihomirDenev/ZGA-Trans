import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SITE_URL } from '@libs/constants/routes.constants';
import { PageMeta } from '@libs/models/page-meta.model';

/**
 * Sets the title, description, canonical link and social tags for each page.
 * Runs during prerendering too, so the generated HTML already has the right tags for Google.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  updatePageMeta(pageMeta: PageMeta): void {
    const pageUrl = `${SITE_URL}${pageMeta.path}`;
    const robotsContent = pageMeta.isIndexable ? 'index, follow' : 'noindex, follow';

    this.title.setTitle(pageMeta.title);
    this.meta.updateTag({ name: 'description', content: pageMeta.description });
    this.meta.updateTag({ name: 'robots', content: robotsContent });
    this.meta.updateTag({ property: 'og:title', content: pageMeta.title });
    this.meta.updateTag({ property: 'og:description', content: pageMeta.description });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.meta.updateTag({ name: 'twitter:title', content: pageMeta.title });
    this.meta.updateTag({ name: 'twitter:description', content: pageMeta.description });
    this.updateCanonicalLink(pageUrl);
  }

  /** Adds (or replaces) a JSON-LD block in <head>, e.g. the FAQ schema */
  setStructuredData(scriptId: string, structuredData: object): void {
    this.removeStructuredData(scriptId);

    const script = this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  removeStructuredData(scriptId: string): void {
    this.document.getElementById(scriptId)?.remove();
  }

  private updateCanonicalLink(pageUrl: string): void {
    let canonicalLink = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.rel = 'canonical';
      this.document.head.appendChild(canonicalLink);
    }

    canonicalLink.href = pageUrl;
  }
}
