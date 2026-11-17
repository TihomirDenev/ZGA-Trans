import { Component } from '@angular/core';

import { ContactComponent } from '@libs/components/contact/contact.component';
import { HeroComponent } from '@libs/components/hero/hero.component';
import { JourneyComponent } from '@libs/components/journey/journey.component';
import { MarqueeComponent } from '@libs/components/marquee/marquee.component';
import { ServicesComponent } from '@libs/components/services/services.component';
import { WhyUsComponent } from '@libs/components/why-us/why-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    MarqueeComponent,
    ServicesComponent,
    JourneyComponent,
    WhyUsComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
