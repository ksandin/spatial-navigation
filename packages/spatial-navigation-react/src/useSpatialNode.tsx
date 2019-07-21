import { SpatialNode } from 'spatial-navigation';
import * as React from 'react';
import { SpatialGroupContext } from './SpatialGroupContext';

export const useSpatialNode = <T extends SpatialNode>(
  initialNode: T,
  initialize: (node: T) => unknown = () => {}
) => {
  const group = React.useContext(SpatialGroupContext);
  const [{ node }, setState] = React.useState({ node: initialNode });
  React.useLayoutEffect(() => {
    initialize(node);
    const unsubscribeFromChanges = node.subscribeToChanges(() =>
      setState({ node })
    );
    group.add(node);
    return () => {
      unsubscribeFromChanges();
      group.remove(node);
    };
  }, [group, node]);
  return node;
};
