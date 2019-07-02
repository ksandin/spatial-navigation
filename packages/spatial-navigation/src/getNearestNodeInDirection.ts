import { Rect } from './Rect';
import { Direction } from './Direction';
import { getTravelCost } from './getTravelCost';
import { lineFunctions } from './lineFunctions';
import { getDirectionAngle } from './getDirectionAngle';

export function getNearestNodeInDirection(
  start: Rect,
  candidates: Rect[],
  direction: Direction
) {
  const getLine = lineFunctions[direction];
  const desiredAngle = getDirectionAngle(direction);
  const { nearest } = candidates.reduce<NearestReducer>(
    ({ nearest, nearestCost }, candidate) => {
      const candidateCost = getTravelCost(
        getLine(start, candidate),
        desiredAngle
      );
      if (candidateCost >= 0 && candidateCost < nearestCost) {
        return { nearest: candidate, nearestCost: candidateCost };
      }
      return { nearest, nearestCost };
    },
    { nearest: null, nearestCost: Infinity }
  );
  if (nearest) {
    return nearest;
  }
}

type NearestReducer = {
  nearest: Rect | null;
  nearestCost: number;
};
