import { Component } from '@angular/core';

import {
  CAB_ROOF_LIGHT_POSITIONS_X,
  TRAILER_MARKER_LIGHT_POSITIONS_X,
  TRUCK_WHEEL_POSITIONS_X,
  TRUCK_WHEEL_SPOKE_ANGLES,
} from '@libs/constants/truck.constants';

/**
 * Side view of the ZGA Trans truck. Purely visual — the parent section animates
 * `.truck-wheel` (rotation) and `.truck-body` (suspension bounce).
 */
@Component({
  selector: 'app-truck',
  standalone: true,
  templateUrl: './truck.component.html',
  styleUrl: './truck.component.scss',
})
export class TruckComponent {
  protected readonly wheelPositionsX = TRUCK_WHEEL_POSITIONS_X;
  protected readonly wheelSpokeAngles = TRUCK_WHEEL_SPOKE_ANGLES;
  protected readonly trailerLightPositionsX = TRAILER_MARKER_LIGHT_POSITIONS_X;
  protected readonly cabRoofLightPositionsX = CAB_ROOF_LIGHT_POSITIONS_X;
}
