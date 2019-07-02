import { getAngleDelta } from './getAngleDelta';
import { Line } from './Line';

export function getTravelCost([a, b]: Line, desiredAngle: number): number {
  const distance = a.distance(b);
  const angle = a.angle(b);
  const angleDelta = getAngleDelta(desiredAngle, angle);
  if (angleDelta >= Math.PI / 2) {
    return -1;
  }
  const anglePenalty = angleDelta / (Math.PI / 2);
  return distance + distance * anglePenalty;
}
