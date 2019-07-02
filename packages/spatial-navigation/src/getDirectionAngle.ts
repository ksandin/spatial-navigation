import { Direction } from './Direction';

export function getDirectionAngle(direction: Direction) {
  switch (direction) {
    case 'right':
      return 0;
    case 'down':
      return Math.PI / 2;
    case 'left':
      return Math.PI;
    case 'up':
      return -Math.PI / 2;
  }
  return 0;
}
