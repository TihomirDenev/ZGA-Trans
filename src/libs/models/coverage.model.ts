export interface CoverageCity {
  id: string;
  name: string;
  /** Position inside the coverage map's view box */
  x: number;
  y: number;
  /** Which side of the dot the name sits on, so labels don't run off the map */
  labelSide: 'left' | 'right';
}

export interface CoverageRoute {
  id: string;
  roadName: string;
  /** Cities the route passes through, in order */
  cityIds: string[];
}
