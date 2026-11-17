import { Component } from '@angular/core';

import { TYRE_TREAD_COUNT } from '@libs/constants/animation.constants';

const TYRE_SPOKE_COUNT = 5;
const TYRE_LUG_NUT_COUNT = 10;

/** Big detailed truck tyre. The parent section rotates `.tyre` with the scroll. */
@Component({
  selector: 'app-tyre',
  standalone: true,
  templateUrl: './tyre.component.html',
  styleUrl: './tyre.component.scss',
})
export class TyreComponent {
  protected readonly treadAngles = this.buildEvenAngles(TYRE_TREAD_COUNT);
  protected readonly spokeAngles = this.buildEvenAngles(TYRE_SPOKE_COUNT);
  protected readonly lugNutAngles = this.buildEvenAngles(TYRE_LUG_NUT_COUNT);

  /** Returns `count` angles spread evenly around a full circle, e.g. 4 → [0, 90, 180, 270] */
  private buildEvenAngles(count: number): number[] {
    const angleStep = 360 / count;

    return Array.from({ length: count }, (_, index) => index * angleStep);
  }
}
