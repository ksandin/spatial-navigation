import { Direction } from '../Direction';
import { Vector } from '../Vector';
import { createDOMElement } from './createDOMElement';
import { SpatialElement } from '../Spatial2';

export const createDOMElementsInDirection = (
  direction: Direction,
  count: number = 3,
  width: number = 10,
  height: number = width,
  space: number = 1
) => {
  const vector = Vector[direction];
  return Array.from(new Array(count)).map((v, i) =>
    createDOMElement(
      i * vector.x * (width + space),
      i * vector.y * (height + space),
      width,
      height
    )
  );
};

export const createSpatialElementsInDirection = (
  direction: Direction,
  count?: number
) => {
  const domElements = createDOMElementsInDirection(direction, count);
  return domElements.map(domElement => new SpatialElement(domElement));
};
