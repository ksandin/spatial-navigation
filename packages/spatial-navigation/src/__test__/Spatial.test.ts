import { directions } from '../math/Direction';
import { SpatialNavigator } from '../navigator/SpatialNavigator';
import { SpatialGroup } from '../SpatialGroup';
import { createElement } from './createElement';
import { createElementsInDirection } from './createElementsInDirection';
import { getDirectionAngle } from '../math/getDirectionAngle';
import { getAngleDirection } from '../math/getAngleDirection';

describe('Spatial', () => {
  // Adding and removing nodes
  it('the default node is the top left node', () => {
    const group = new SpatialGroup();
    const { defaultNode, nodes } = exampleNodes();
    nodes.forEach(node => group.add(node));
    expect(new SpatialNavigator().getDefaultNode(group)).toBe(defaultNode);
  });
  it('a new system has no cursor', () => {
    const group = new SpatialGroup();
    expect(group.cursor).toBeUndefined();
  });
  it('adding a node when there is no cursor will set the added node as cursor', () => {
    const group = new SpatialGroup();
    const node = createElement();
    group.add(node);
    expect(group.cursor).toBe(node);
  });
  it('adding a node when there is a cursor does not change the cursor', () => {
    const group = new SpatialGroup();
    const node1 = createElement();
    const node2 = createElement();
    group.add(node1);
    group.add(node2);
    expect(group.cursor).toBe(node1);
  });
  it('adding nodes in batch when there is no cursor will set the default node as cursor', () => {
    const group = new SpatialGroup();
    const { defaultNode, nodes } = exampleNodes();
    group.add(...nodes);
    expect(new SpatialNavigator().getDefaultNode(group)).toBe(defaultNode);
  });
  it('can get arbitrary adjacent node', () => {
    const group = new SpatialGroup();
    group.add(...fourNodesInASquare());
    const navigator = new SpatialNavigator();
    const adjacent = navigator.getAdjacentNode(group.cursor!);
    expect(adjacent).toBeDefined();
    expect(adjacent).not.toBe(group.cursor);
  });
  it('can remove cursor node and reset cursor to adjacent node', () => {
    const group = new SpatialGroup();
    group.add(...fourNodesInASquare());
    const navigator = new SpatialNavigator();
    const adjacent = navigator.getAdjacentNode(group.cursor!);
    navigator.removeNodeAndSetCursorToAdjacent(group.cursor!);
    expect(group.cursor).toBe(adjacent);
  });
  it('can set a specific node as cursor', () => {
    const group = new SpatialGroup();
    const node1 = createElement(0, 0, 20);
    const node2 = createElement(0, 0, 20);
    group.add(node1, node2);
    node2.setAsCursor();
    expect(group.cursor).toBe(node2);
  });

  // Navigation
  for (const direction of directions) {
    const angle = getDirectionAngle(direction);
    const acrossDirection = getAngleDirection(angle + Math.PI / 2);
    const inverseDirection = getAngleDirection(angle + Math.PI);

    it(`can navigate ${direction}`, () => {
      const group = new SpatialGroup();
      const row = createElementsInDirection(direction, 2);
      group.add(...row);
      row[0].setAsCursor();
      new SpatialNavigator().navigate(group, direction);
      expect(group.cursor).toBe(row[1]);
    });

    it(`can no longer navigate ${direction} to a node that is removed`, () => {
      const group = new SpatialGroup();
      const row = createElementsInDirection(direction, 3);
      const [start, middle, end] = row;
      group.add(...row);
      start.setAsCursor();
      group.remove(middle);
      new SpatialNavigator().navigate(group, direction);
      expect(group.cursor).toBe(end);
    });

    it(`can navigate ${direction} to a sibling node within a group`, () => {
      const group = new SpatialGroup();
      const nodes = createElementsInDirection(direction, 2);
      group.add(...nodes);
      new SpatialNavigator().navigate(group, direction);
      expect(group.cursor).toBe(nodes[1]);
    });

    it(`can navigate ${direction} to a parent sibling node when no siblings within its own group accept navigation`, () => {
      const root = new SpatialGroup();
      const group = new SpatialGroup();
      const [node1, node2] = createElementsInDirection(direction, 2);
      group.add(node1);
      root.add(group, node2);
      node1.setAsCursor();
      new SpatialNavigator().navigate(root, direction);
      expect(root.cursor).toBe(node2);
    });

    it(`can reuse group memory when navigating ${direction}`, () => {
      const root = new SpatialGroup();
      const group = new SpatialGroup();
      const [node1, node2] = createElementsInDirection(acrossDirection, 2);
      const [throwAway, node3] = createElementsInDirection(direction, 2);
      group.add(node1, node2);
      root.add(group, node3);
      node2.setAsCursor();
      const navigator = new SpatialNavigator();
      navigator.navigate(root, direction);
      navigator.navigate(root, inverseDirection);
      expect(root.cursor).toBe(node2);
    });

    it(`activates the nearest child node when navigating ${direction} to a group without memory`, () => {
      const root = new SpatialGroup();
      const group = new SpatialGroup();
      const [node1, node2] = createElementsInDirection(acrossDirection, 2);
      const [throwAway, node3] = createElementsInDirection(direction, 2);
      group.add(node1, node2);
      root.add(group, node3);
      node3.setAsCursor();
      new SpatialNavigator().navigate(root, inverseDirection);
      expect(root.cursor).toBe(node1);
    });
  }
});

const exampleNodes = () => {
  const nodes = fourNodesInASquare();
  return {
    nodes,
    defaultNode: nodes[2]
  };
};

const fourNodesInASquare = () => [
  createElement(50, 0, 10), // top right
  createElement(50, 50, 10), // bottom right
  createElement(0, 0, 10), // top left
  createElement(0, 50, 10) // bottom left
];
