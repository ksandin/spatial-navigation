import { useSpatialNode } from './useSpatialNode';
import { SpatialGroup } from 'spatial-navigation';

export const useSpatialGroup = () => useSpatialNode(new SpatialGroup());
