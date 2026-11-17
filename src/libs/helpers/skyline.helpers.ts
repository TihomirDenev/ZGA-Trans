/**
 * Builds an SVG path that looks like a city skyline: one flat-topped block per building,
 * all standing on the bottom edge of the view box.
 */
export function buildSkylinePath(
  buildingHeights: number[],
  buildingWidth: number,
  viewHeight: number,
): string {
  let skylinePath = `M0 ${viewHeight}`;

  buildingHeights.forEach((buildingHeight, index) => {
    const buildingLeft = index * buildingWidth;
    const buildingRight = buildingLeft + buildingWidth;
    const buildingTop = viewHeight - buildingHeight;

    skylinePath += ` L${buildingLeft} ${buildingTop} L${buildingRight} ${buildingTop}`;
  });

  const skylineWidth = buildingHeights.length * buildingWidth;
  skylinePath += ` L${skylineWidth} ${viewHeight} Z`;

  return skylinePath;
}
