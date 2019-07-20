import { getAngleDirection } from './getAngleDirection';

export class Vector {
  static up = new Vector(0, -1);
  static right = new Vector(1, 0);
  static down = new Vector(0, 1);
  static left = new Vector(-1, 0);

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
