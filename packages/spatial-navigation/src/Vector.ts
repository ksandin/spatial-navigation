import { getAngleDirection } from './getAngleDirection';

export class Vector {
  constructor(public readonly x: number = 0, public readonly y: number = 0) {}

  distance(b: Vector) {
    return Math.hypot(this.x - b.x, this.y - b.y);
  }

  angle(b: Vector) {
    return Math.atan2(b.y - this.y, b.x - this.x);
  }

  direction(b: Vector) {
    return getAngleDirection(this.angle(b));
  }
}
