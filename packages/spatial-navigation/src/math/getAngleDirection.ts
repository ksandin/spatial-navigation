import { Direction, directions } from './Direction';
import { getAngleDelta } from './getAngleDelta';
import { getDirectionAngle } from './getDirectionAngle';

export function getAngleDirection(angle: number): Direction {
  let nearestAngleDiff = Infinity;
  let nearestDirection: Direction | undefined;
  for (const direction of directions) {
    const directionAngle = getDirectionAngle(direction);
    const diff = getAngleDelta(directionAngle, angle);
    if (diff < nearestAngleDiff) {
      nearestDirection = direction;
      nearestAngleDiff = diff;
    }
  }
  return nearestDirection!;
}
