import { SpatialNavigator, SpatialGroup, Direction } from 'spatial-navigation';

export const inputEffect = (root: SpatialGroup, window: Window) => {
  const onKeyDown = (e: KeyboardEvent) => {
    const direction = directionByKey[e.key];
    if (direction) {
      new SpatialNavigator().navigate(root, direction);
    }
  };
  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
};

const directionByKey: { [key: string]: Direction } = {
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowLeft: 'left'
};
