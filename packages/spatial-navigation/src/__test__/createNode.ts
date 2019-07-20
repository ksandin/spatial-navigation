export const createNode = (
  x: number,
  y: number,
  width: number,
  height: number = width
) => {
  const node = document.createElement('div');
  const rect: ClientRect = {
    width,
    height,
    left: x,
    top: y,
    right: x + width,
    bottom: y + height
  };
  Object.assign(node.style, {
    position: 'absolute',
    width: `${width}px`,
    height: `${height}px`,
    left: `${x}px`,
    top: `${y}px`
  });
  node.getBoundingClientRect = () => rect;
  return node;
};
