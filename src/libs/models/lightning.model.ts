export interface LightningPoint {
  x: number;
  y: number;
}

export interface LightningBranch {
  points: LightningPoint[];
  /** Line width of the bright core in CSS pixels */
  coreWidth: number;
}
