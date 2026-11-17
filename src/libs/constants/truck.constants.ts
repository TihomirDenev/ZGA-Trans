// All positions are in the truck SVG's coordinate system (viewBox 0 0 960 240).

/** X centre of every wheel: three trailer axles, then the tractor's two drive axles and its steer axle */
export const TRUCK_WHEEL_POSITIONS_X: number[] = [78, 140, 202, 700, 752, 866];

/** Angles of the round "hand holes" in the polished rims, so you can see the wheels turning */
export const TRUCK_RIM_HOLE_ANGLES: number[] = Array.from({ length: 10 }, (_, index) => index * 36);

/** Angles of the wheel nuts around the hub */
export const TRUCK_HUB_NUT_ANGLES: number[] = Array.from({ length: 8 }, (_, index) => index * 45);

/** X positions of the amber marker lights along the trailer (top and bottom rows) */
export const TRAILER_MARKER_LIGHT_POSITIONS_X: number[] = Array.from(
  { length: 17 },
  (_, index) => 28 + index * 37,
);

/** X positions of the subtle vertical ribs on the trailer box */
export const TRAILER_RIB_POSITIONS_X: number[] = Array.from(
  { length: 12 },
  (_, index) => 56 + index * 48,
);

/** X positions of the big lamps on the roof light bar */
export const CAB_ROOF_LAMP_POSITIONS_X: number[] = [766, 790, 814, 838, 862];

/** X positions of the small amber lamps on the sun visor */
export const CAB_VISOR_LAMP_POSITIONS_X: number[] = [860, 871, 882, 892];

/** X positions of the amber marker lights along the cab roof edge */
export const CAB_ROOF_EDGE_LIGHT_POSITIONS_X: number[] = [690, 708, 726, 744];
