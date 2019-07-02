import React from 'react';
import { Spatial } from 'spatial-navigation';
import { SpatialContext } from 'spatial-navigation-react';

export type ProvidersProps = {
  spatial: Spatial;
};

export const Providers: React.FC<ProvidersProps> = ({ children, spatial }) => {
  return (
    <SpatialContext.Provider value={spatial}>
      {children}
    </SpatialContext.Provider>
  );
};
