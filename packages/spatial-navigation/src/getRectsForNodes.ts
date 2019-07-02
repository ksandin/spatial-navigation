import { Rect } from './Rect';
import { SpatialNode } from './SpatialNode';

export const getRectsForNodes = (elements: SpatialNode[]): Rect[] =>
  elements.map(element => {
    const rect = element.getBoundingClientRect();
    return new Rect(rect.left, rect.top, rect.width, rect.height);
  });
