import * as React from 'react';
import { SpatialGroup } from 'spatial-navigation';

export const SpatialGroupContext = React.createContext<SpatialGroup>(
  new SpatialGroup()
);
