/** X centre of every wheel inside the truck SVG (viewBox 0 0 820 220). Trailer axles first, then the cab. */
export const TRUCK_WHEEL_POSITIONS_X: number[] = [72, 126, 180, 650, 748];

/** Angles of the rim spokes, so you can actually see the wheels turning */
export const TRUCK_WHEEL_SPOKE_ANGLES: number[] = [0, 60, 120, 180, 240, 300];

/** X positions of the amber marker lights along the trailer */
export const TRAILER_MARKER_LIGHT_POSITIONS_X: number[] = [
  30, 66, 102, 138, 174, 210, 246, 282, 318, 354, 390, 426, 462, 498, 534, 570,
];

/** X positions of the amber marker lights on the cab roof (inside the cab group, before it is shifted) */
export const CAB_ROOF_LIGHT_POSITIONS_X: number[] = [494, 512, 530, 548, 566, 584];
