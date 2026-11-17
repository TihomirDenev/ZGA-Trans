import { Injectable, signal } from '@angular/core';

/** Remembers whether the intro loader has already played, so it only delays the hero once */
@Injectable({ providedIn: 'root' })
export class IntroStateService {
  readonly isIntroFinished = signal(false);

  markIntroFinished(): void {
    this.isIntroFinished.set(true);
  }
}
