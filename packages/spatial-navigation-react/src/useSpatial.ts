import * as React from 'react';
import { SpatialNode } from 'spatial-navigation';
import { SpatialContext } from './SpatialContext';

export function useSpatial(ref: React.RefObject<SpatialNode>) {
  const getNode = React.useCallback(() => ref.current!, [ref]);
  const spatial = React.useContext(SpatialContext);
  const [isActive, setActive] = React.useState(spatial.isActive(getNode()));
  const refreshActive = React.useCallback(
    () => setActive(spatial.isActive(getNode())),
    [spatial, getNode]
  );

  React.useLayoutEffect(() => {
    spatial.add(getNode());
    refreshActive();
    const unsubscribeFromChanges = spatial.subscribeToChanges(refreshActive);
    return () => {
      unsubscribeFromChanges();
      spatial.remove(getNode());
    };
  }, [spatial, getNode, refreshActive]);
  return isActive;
}
