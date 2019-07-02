import * as React from 'react';
import { useSpatial } from 'spatial-navigation-react';

export const Box: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isActive = useSpatial(ref);
  return (
    <div ref={ref} style={style(isActive)}>
      {isActive ? 'active' : 'inactive'}
    </div>
  );
};

const style = (isActive: boolean) => ({
  marginRight: 10,
  background: isActive ? 'skyblue' : 'tomato'
});
