import { Component } from '@angular/core';

import {
  CAB_ROOF_EDGE_LIGHT_POSITIONS_X,
  CAB_ROOF_LAMP_POSITIONS_X,
  CAB_VISOR_LAMP_POSITIONS_X,
  TRAILER_MARKER_LIGHT_POSITIONS_X,
  TRAILER_RIB_POSITIONS_X,
  TRUCK_HUB_NUT_ANGLES,
  TRUCK_RIM_HOLE_ANGLES,
  TRUCK_WHEEL_POSITIONS_X,
} from '@libs/constants/truck.constants';

/**
 * Side view of the ZGA Trans rig: a Scania-style V8 tractor with a high cab and a
 * tri-axle trailer. Purely visual — the parent section animates `.truck-wheel`
 * (rotation), `.truck-body` (suspension bounce) and `.truck-brake-glow` (brake lights).
 */
@Component({
  selector: 'app-truck',
  standalone: true,
  templateUrl: './truck.component.html',
  styleUrl: './truck.component.scss',
})
export class TruckComponent {
  protected readonly wheelPositionsX = TRUCK_WHEEL_POSITIONS_X;
  protected readonly rimHoleAngles = TRUCK_RIM_HOLE_ANGLES;
  protected readonly hubNutAngles = TRUCK_HUB_NUT_ANGLES;
  protected readonly trailerLightPositionsX = TRAILER_MARKER_LIGHT_POSITIONS_X;
  protected readonly trailerRibPositionsX = TRAILER_RIB_POSITIONS_X;
  protected readonly roofLampPositionsX = CAB_ROOF_LAMP_POSITIONS_X;
  protected readonly visorLampPositionsX = CAB_VISOR_LAMP_POSITIONS_X;
  protected readonly roofEdgeLightPositionsX = CAB_ROOF_EDGE_LIGHT_POSITIONS_X;
}
