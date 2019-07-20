import { Spatial } from '../Spatial';
import { createDOMElement } from './createDOMElement';
import { directions } from '../Direction';
import {
  createDOMElementsInDirection,
  createSpatialElementsInDirection
} from './createElementsInDirection';
import { SpatialGroup, SpatialNavigator, Node } from '../Spatial2';

describe('Spatial', () => {
  // Adding and removing nodes
  it('the default node is the top left node', () => {
    const spatial = new Spatial();
    const { defaultNode, nodes } = exampleNodes();
    nodes.forEach(node => spatial.add(node));
    expect(spatial.getDefaultNode()).toBe(defaultNode);
  });
  it('a new system has no active node', () => {
    const spatial = new Spatial();
    expect(spatial.getActive()).toBeUndefined();
  });
  it('adding a node when there is no active node will set the added node as active', () => {
    const spatial = new Spatial();
    const node = document.createElement('div');
    spatial.add(node);
    expect(spatial.getActive()).toBe(node);
  });
  it('adding a node when there is an active node does not change the active node', () => {
    const spatial = new Spatial();
    const node1 = document.createElement('div');
    const node2 = document.createElement('div');
    spatial.add(node1);
    spatial.add(node2);
    expect(spatial.getActive()).toBe(node1);
  });
  it('adding nodes in batch when there is no active node will set the default node as as active', () => {
    const spatial = new Spatial();
    const { defaultNode, nodes } = exampleNodes();
    spatial.addBatch(nodes);
    expect(spatial.getDefaultNode()).toBe(defaultNode);
  });
  it('activates adjacent node when removing active node', () => {
    const spatial = new Spatial();
    spatial.addBatch(fourNodesInASquare());
    const adjacent = spatial.getAdjacentNode();
    spatial.remove(spatial.getActive()!);
    expect(spatial.getActive()).toBe(adjacent);
  });
  it('can set a new node as active', () => {
    const spatial = new Spatial();
    const node = createDOMElement(0, 0, 20);
    spatial.setActive(node);
    expect(spatial.getActive()).toBe(node);
  });

  // Basic navigation (no groups)
  for (const direction of directions) {
    it(`can navigate ${direction}`, () => {
      const spatial = new Spatial();
      const row = createDOMElementsInDirection(direction, 2);
      spatial.addBatch(row);
      spatial.setActive(row[0]);
      spatial.move(direction);
      expect(spatial.getActive()).toBe(row[1]);
    });
    it(`can no longer navigate ${direction} to a node that is removed`, () => {
      const spatial = new Spatial();
      const row = createDOMElementsInDirection(direction, 3);
      const [start, middle, end] = row;
      spatial.addBatch(row);
      spatial.setActive(start);
      spatial.remove(middle);
      spatial.move(direction);
      expect(spatial.getActive()).toBe(end);
    });
  }

  // Group navigation
  it('can navigate to a sibling node within a group', () => {
    const group = new SpatialGroup();
    const nodes = createSpatialElementsInDirection('right', 2);
    group.add(...nodes);
    new SpatialNavigator().navigate(group, 'right');
    expectSameNodes(group.cursor, nodes[1]);
  });
  it('navigates to a parent sibling node when no siblings within its own group accept navigation', () => {
    const root = new SpatialGroup();
    const group = new SpatialGroup();
    const [node1, node2] = createSpatialElementsInDirection('right', 2);
    group.add(node1);
    root.add(group, node2);
    node1.setAsCursor();
    new SpatialNavigator().navigate(root, 'right');
    expectSameNodes(root.cursor, node2);
  });
  it('reuses group memory by activating the memorized node', () => {
    const root = new SpatialGroup();
    const group = new SpatialGroup();
    const [node1, node2] = createSpatialElementsInDirection('down', 2);
    const [throwAway, node3] = createSpatialElementsInDirection('right', 2);
    group.add(node1, node2);
    root.add(group, node3);
    node2.setAsCursor();
    const navigator = new SpatialNavigator();
    navigator.navigate(root, 'right');
    navigator.navigate(root, 'left');
    expectSameNodes(root.cursor, node2);
  });
  it('activates the nearest child node when navigating to a group without memory', () => {
    const root = new SpatialGroup();
    const group = new SpatialGroup();
    const [node1, node2] = createSpatialElementsInDirection('down', 2);
    const [throwAway, node3] = createSpatialElementsInDirection('right', 2);
    group.add(node1, node2);
    root.add(group, node3);
    node3.setAsCursor();
    new SpatialNavigator().navigate(root, 'left');
    expectSameNodes(root.cursor, node1);
  });
});

const expectSameNodes = (n1?: Node, n2?: Node) =>
  expect(n1 && n1.id).toBe(n2 && n2.id);

const exampleNodes = () => {
  const nodes = fourNodesInASquare();
  return {
    nodes,
    defaultNode: nodes[2]
  };
};

const fourNodesInASquare = () => [
  createDOMElement(20, 0, 20), // top right
  createDOMElement(20, 20, 20), // bottom right
  createDOMElement(0, 0, 20), // top left
  createDOMElement(0, 20, 20) // bottom left
];
