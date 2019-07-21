import { Rect } from './Rect';
import { Line } from './Line';

export const lineFunctions = {
  right: (a: Rect, b: Rect): Line => [a.centerRight, b.centerLeft],
  down: (a: Rect, b: Rect): Line => [a.centerBottom, b.centerTop],
  left: (a: Rect, b: Rect): Line => [a.centerLeft, b.centerRight],
  up: (a: Rect, b: Rect): Line => [a.centerTop, b.centerBottom]
};
