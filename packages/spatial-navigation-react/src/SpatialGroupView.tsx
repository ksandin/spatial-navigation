import * as React from 'react';
import { SpatialGroup } from 'spatial-navigation';
import { useSpatialGroup } from './useSpatialGroup';
import { SpatialGroupContext } from './SpatialGroupContext';

export type SpatialGroupViewProps = {
  children: (group: SpatialGroup) => React.ReactNode;
};

export const SpatialGroupView: React.FC<SpatialGroupViewProps> = ({
  children
}) => {
  const group = useSpatialGroup();
  return (
    <SpatialGroupContext.Provider value={group}>
      {children(group)}
    </SpatialGroupContext.Provider>
  );
};
