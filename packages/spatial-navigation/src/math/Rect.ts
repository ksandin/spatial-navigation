import { Vector } from './Vector';
import { lineFunctions } from './lineFunctions';

export class Rect extends Vector {
  get left() {
    return this.x;
  }

  get top() {
    return this.y;
  }

  get right() {
    return this.x + this.width;
  }

  get bottom() {
    return this.y + this.height;
  }

  get centerY() {
    return this.y + this.height / 2;
  }

  get centerX() {
    return this.x + this.width / 2;
  }

  get center() {
    return new Vector(this.centerX, this.centerY);
  }

  get centerRight() {
    return new Vector(this.right, this.centerY);
  }

  get centerLeft() {
    return new Vector(this.left, this.centerY);
  }

  get centerTop() {
    return new Vector(this.centerX, this.top);
  }

  get centerBottom() {
    return new Vector(this.centerX, this.bottom);
  }

  line(b: Rect) {
    const direction = this.center.direction(b.center);
    const getLine = lineFunctions[direction];
    return getLine(this, b);
  }

  scale(scaleX: number, scaleY: number = scaleX) {
    return new Rect(this.x, this.y, this.width * scaleX, this.height * scaleY);
  }

  position(x: number, y: number) {
    return new Rect(x, y, this.width, this.height);
  }

  resize(width: number, height: number = width) {
    return new Rect(this.x, this.y, width, height);
  }

  constructor(
    x?: number,
    y?: number,
    public width: number = 0,
    public height: number = 0
  ) {
    super(x, y);
  }

  static box(rects: Rect[]) {
    const left = rects.map(rect => rect.left).sort(numericCompare)[0];
    const right = rects.map(rect => rect.right).sort(numericCompare)[0];
    const top = rects.map(rect => rect.top).sort(numericCompare)[0];
    const bottom = rects.map(rect => rect.bottom).sort(numericCompare)[0];
    return new Rect(left, top, right - left, bottom - top);
  }
}

const numericCompare = (a: number, b: number) => a - b;
