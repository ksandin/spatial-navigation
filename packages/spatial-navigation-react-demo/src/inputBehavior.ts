import { Spatial, Direction } from 'spatial-navigation';

export const inputBehavior = (spatial: Spatial, window: Window) => {
  const onKeyDown = (e: KeyboardEvent) => {
    const direction = directionByKey[e.key];
    if (direction) {
      spatial.move(direction);
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
