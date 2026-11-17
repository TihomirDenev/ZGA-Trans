import { getRandomNumberBetween } from '@libs/helpers/animation.helpers';
import { LightningBranch, LightningPoint } from '@libs/models/lightning.model';

// ─── Build ───────────────────────────────────────────────────────────────────

/**
 * Builds one lightning strike: a main bolt from the top of the canvas plus a few
 * thinner side branches that split off from it.
 */
export function buildLightningStrike(canvasWidth: number, canvasHeight: number): LightningBranch[] {
  const startPoint: LightningPoint = {
    x: getRandomNumberBetween(canvasWidth * 0.1, canvasWidth * 0.9),
    y: 0,
  };
  const endPoint: LightningPoint = {
    x: startPoint.x + getRandomNumberBetween(-canvasWidth * 0.15, canvasWidth * 0.15),
    y: canvasHeight * getRandomNumberBetween(0.45, 0.85),
  };

  const mainBolt: LightningBranch = {
    points: buildJaggedLine(startPoint, endPoint),
    coreWidth: 2.2,
  };

  const sideBranches = buildSideBranches(mainBolt.points);

  return [mainBolt, ...sideBranches];
}

function buildSideBranches(mainPoints: LightningPoint[]): LightningBranch[] {
  const sideBranches: LightningBranch[] = [];

  mainPoints.forEach((point, index) => {
    const isFirstOrLastPoint = index === 0 || index === mainPoints.length - 1;
    const shouldSplitHere = Math.random() < 0.22;

    if (isFirstOrLastPoint || !shouldSplitHere) {
      return;
    }

    const direction = Math.random() < 0.5 ? -1 : 1;
    const branchLength = getRandomNumberBetween(60, 200);
    const branchEnd: LightningPoint = {
      x: point.x + direction * branchLength,
      y: point.y + branchLength * getRandomNumberBetween(0.6, 1.2),
    };

    sideBranches.push({
      points: buildJaggedLine(point, branchEnd),
      coreWidth: 1,
    });
  });

  return sideBranches;
}

/** Splits a straight line into many short segments and shifts each one sideways */
function buildJaggedLine(start: LightningPoint, end: LightningPoint): LightningPoint[] {
  const segmentCount = Math.round(getRandomNumberBetween(12, 20));
  const lineLength = Math.hypot(end.x - start.x, end.y - start.y);
  const maxSideShift = lineLength / 14;
  const points: LightningPoint[] = [start];

  for (let segment = 1; segment < segmentCount; segment++) {
    const progress = segment / segmentCount;
    points.push({
      x:
        start.x +
        (end.x - start.x) * progress +
        getRandomNumberBetween(-maxSideShift, maxSideShift),
      y: start.y + (end.y - start.y) * progress,
    });
  }

  points.push(end);

  return points;
}

// ─── Draw ────────────────────────────────────────────────────────────────────

export function drawLightningStrike(
  context: CanvasRenderingContext2D,
  branches: LightningBranch[],
  opacity: number,
): void {
  context.save();
  context.globalCompositeOperation = 'lighter';
  context.lineCap = 'round';
  context.lineJoin = 'round';

  branches.forEach((branch) => {
    drawBranchGlow(context, branch, opacity);
    drawBranchCore(context, branch, opacity);
  });

  context.restore();
}

function drawBranchGlow(
  context: CanvasRenderingContext2D,
  branch: LightningBranch,
  opacity: number,
): void {
  context.shadowColor = `rgba(61, 123, 255, ${opacity})`;
  context.shadowBlur = 28;
  context.strokeStyle = `rgba(90, 150, 255, ${opacity * 0.7})`;
  context.lineWidth = branch.coreWidth * 4;
  traceBranchPath(context, branch.points);
}

function drawBranchCore(
  context: CanvasRenderingContext2D,
  branch: LightningBranch,
  opacity: number,
): void {
  context.shadowBlur = 8;
  context.strokeStyle = `rgba(230, 240, 255, ${opacity})`;
  context.lineWidth = branch.coreWidth;
  traceBranchPath(context, branch.points);
}

function traceBranchPath(context: CanvasRenderingContext2D, points: LightningPoint[]): void {
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);

  points.slice(1).forEach((point) => context.lineTo(point.x, point.y));

  context.stroke();
}
