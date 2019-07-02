import { getNearestNodeInDirection } from './getNearestNodeInDirection';
import { Rect } from './Rect';

const middle = new Rect(0, 0, 10, 10);
const right = new Rect(20, 0, 10, 10);
const left = new Rect(-20, 0, 10, 10);
const up = new Rect(0, -20, 10, 10);
const down = new Rect(0, 20, 10, 10);
const candidates = [
  right,
  new Rect(40, 0, 10, 10),
  left,
  new Rect(-40, 0, 10, 10),
  up,
  new Rect(0, -40, 10, 10),
  down,
  new Rect(0, 40, 10, 10)
];

describe('getNearestNodeInDirection', () => {
  it('gets the nearest right node', () => {
    const node = getNearestNodeInDirection(middle, candidates, 'right');
    expect(node).toBe(right);
  });
  it('gets the nearest down node', () => {
    const node = getNearestNodeInDirection(middle, candidates, 'down');
    expect(node).toBe(down);
  });
  it('gets the nearest left node', () => {
    const node = getNearestNodeInDirection(middle, candidates, 'left');
    expect(node).toBe(left);
  });
  it('gets the nearest up node', () => {
    const node = getNearestNodeInDirection(middle, candidates, 'up');
    expect(node).toBe(up);
  });
});
