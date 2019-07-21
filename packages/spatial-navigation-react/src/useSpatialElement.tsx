import * as React from 'react';
import { useSpatialNode } from './useSpatialNode';
import { SpatialElement } from 'spatial-navigation';

export const useSpatialElement = (ref: React.RefObject<Element>) => {
  return useSpatialNode(
    new SpatialElement(ref.current),
    element => (element.domElement = ref.current)
  );
};
