import * as React from 'react';

export const Row: React.FC = ({ children }) => (
  <div style={style}>{children}</div>
);

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row'
};
