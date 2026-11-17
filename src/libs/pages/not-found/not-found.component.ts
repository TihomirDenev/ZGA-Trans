import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HOME_PATH } from '@libs/constants/routes.constants';
import { NOT_FOUND_PAGE_META } from '@libs/constants/seo.constants';
import { SeoService } from '@libs/services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  private readonly seo = inject(SeoService);

  protected readonly homePath = HOME_PATH;

  constructor() {
    this.seo.updatePageMeta(NOT_FOUND_PAGE_META);
  }
}
