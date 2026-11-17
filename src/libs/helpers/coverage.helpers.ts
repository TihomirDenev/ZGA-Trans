import { CoverageCity, CoverageRoute } from '@libs/models/coverage.model';

/** How far each road segment bows sideways, as a share of its length (0 = straight line) */
const ROAD_CURVE_AMOUNT = 0.08;

/**
 * Turns a route (a list of city ids) into an SVG path. Every segment between two cities
 * is a gentle curve, so the routes look like roads rather than ruler lines.
 */
export function buildRoutePath(route: CoverageRoute, cities: CoverageCity[]): string {
  const routeCities = route.cityIds
    .map((cityId) => cities.find((city) => city.id === cityId))
    .filter((city): city is CoverageCity => city !== undefined);

  if (routeCities.length < 2) {
    return '';
  }

  const startCity = routeCities[0];
  let routePath = `M${startCity.x} ${startCity.y}`;

  for (let index = 1; index < routeCities.length; index++) {
    const fromCity = routeCities[index - 1];
    const toCity = routeCities[index];
    const controlPoint = getCurveControlPoint(fromCity, toCity);

    routePath += ` Q${controlPoint.x} ${controlPoint.y} ${toCity.x} ${toCity.y}`;
  }

  return routePath;
}

/** The point that pulls a segment into a curve: its middle, nudged sideways */
function getCurveControlPoint(
  fromCity: CoverageCity,
  toCity: CoverageCity,
): { x: number; y: number } {
  const middleX = (fromCity.x + toCity.x) / 2;
  const middleY = (fromCity.y + toCity.y) / 2;
  const deltaX = toCity.x - fromCity.x;
  const deltaY = toCity.y - fromCity.y;

  // Perpendicular to the segment, scaled by its length
  const sidewaysX = -deltaY * ROAD_CURVE_AMOUNT;
  const sidewaysY = deltaX * ROAD_CURVE_AMOUNT;

  return {
    x: Math.round((middleX + sidewaysX) * 10) / 10,
    y: Math.round((middleY + sidewaysY) * 10) / 10,
  };
}
