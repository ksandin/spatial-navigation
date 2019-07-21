import { Direction } from '../Direction';
import { Vector } from '../Vector';
import { createElement } from './createElement';

export const createElementsInDirection = (
  direction: Direction,
  count: number = 3,
  width: number = 10,
  height: number = width,
  space: number = 1
) => {
  const vector = Vector[direction];
  return Array.from(new Array(count)).map((v, i) =>
    createElement(
      i * vector.x * (width + space),
      i * vector.y * (height + space),
      width,
      height
    )
  );
};
