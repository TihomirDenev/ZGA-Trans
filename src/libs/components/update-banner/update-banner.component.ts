import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

/** Small banner that appears when a new version of the installed app has been downloaded */
@Component({
  selector: 'app-update-banner',
  standalone: true,
  templateUrl: './update-banner.component.html',
  styleUrl: './update-banner.component.scss',
})
export class UpdateBannerComponent {
  private readonly swUpdate = inject(SwUpdate);

  protected readonly isUpdateReady = signal(false);

  constructor() {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates
      .pipe(
        filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.isUpdateReady.set(true));

    this.swUpdate.unrecoverable.pipe(takeUntilDestroyed()).subscribe(() => this.onReload());
  }

  onReload(): void {
    document.location.reload();
  }

  onDismiss(): void {
    this.isUpdateReady.set(false);
  }
}
