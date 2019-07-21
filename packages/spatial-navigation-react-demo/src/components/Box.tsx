import * as React from 'react';
import { useSpatialElement } from 'spatial-navigation-react';

export const Box: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const element = useSpatialElement(ref);
  return (
    <div ref={ref} style={style(element.isCursor)}>
      {element.isCursor
        ? 'active'
        : element.isLocalCursor
        ? 'memory'
        : 'inactive'}
    </div>
  );
};

const style = (isActive: boolean) => ({
  marginRight: 10,
  background: isActive ? 'skyblue' : 'tomato'
});
