import { SpatialElement } from '../SpatialElement';

export const createElement = (
  x: number = 0,
  y: number = 0,
  width: number = 10,
  height: number = width
) => new SpatialElement(createDOMElement(x, y, width, height));

const createDOMElement = (
  x: number,
  y: number,
  width: number,
  height: number = width
) => {
  const node = document.createElement('div');
  const rect: ClientRect = {
    width,
    height,
    left: x,
    top: y,
    right: x + width,
    bottom: y + height
  };
  Object.assign(node.style, {
    position: 'absolute',
    width: `${width}px`,
    height: `${height}px`,
    left: `${x}px`,
    top: `${y}px`
  });
  node.getBoundingClientRect = () => rect;
  return node;
};
