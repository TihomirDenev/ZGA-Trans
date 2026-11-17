import { afterNextRender, Component, inject } from '@angular/core';

import { HeaderComponent } from '@libs/components/header/header.component';
import { FooterComponent } from '@libs/components/footer/footer.component';
import { IntroLoaderComponent } from '@libs/components/intro-loader/intro-loader.component';
import { UpdateBannerComponent } from '@libs/components/update-banner/update-banner.component';
import { RoadProgressComponent } from '@libs/components/road-progress/road-progress.component';
import { HomeComponent } from '@libs/pages/home/home.component';
import { SmoothScrollService } from '@libs/services/smooth-scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    IntroLoaderComponent,
    RoadProgressComponent,
    HomeComponent,
    UpdateBannerComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  private readonly smoothScroll = inject(SmoothScrollService);

  constructor() {
    afterNextRender(() => this.smoothScroll.init());
  }
}
