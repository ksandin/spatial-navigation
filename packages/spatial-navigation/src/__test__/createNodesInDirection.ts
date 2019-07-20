import { Direction } from '../Direction';
import { Vector } from '../Vector';
import { createNode } from './createNode';

export const createNodesInDirection = (
  direction: Direction,
  count: number = 3,
  width: number = 10,
  height: number = width,
  space: number = 1
) => {
  const vector = Vector[direction];
  return [...Array(count)].map((v, i) =>
    createNode(
      i * vector.x * (width + space),
      i * vector.y * (height + space),
      width,
      height
    )
  );
};
