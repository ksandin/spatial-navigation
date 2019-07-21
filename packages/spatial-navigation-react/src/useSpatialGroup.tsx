import * as React from 'react';
import { useSpatialNode } from './useSpatialNode';
import { SpatialGroup } from 'spatial-navigation';
import { SpatialGroupContext } from './SpatialGroupContext';

export const useSpatialGroup = (
  render: (group: SpatialGroup) => React.ReactNode
) => {
  const group = useSpatialNode(new SpatialGroup());
  return (
    <SpatialGroupContext.Provider value={group}>
      {render(group)}
    </SpatialGroupContext.Provider>
  );
};
