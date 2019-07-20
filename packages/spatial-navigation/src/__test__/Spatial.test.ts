import { Spatial } from '../Spatial';
import { createNode } from './createNode';
import { directions } from '../Direction';
import { createNodesInDirection } from './createNodesInDirection';

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

  // Basic navigation (no groups)
  for (const direction of directions) {
    it(`can navigate ${direction}`, () => {
      const spatial = new Spatial();
      const row = createNodesInDirection(direction, 2);
      spatial.addBatch(row);
      spatial.setActive(row[0]);
      spatial.move(direction);
      expect(spatial.getActive()).toBe(row[1]);
    });
    it(`can no longer navigate ${direction} to a node that is removed`, () => {
      const spatial = new Spatial();
      const row = createNodesInDirection(direction, 3);
      const [start, middle, end] = row;
      spatial.addBatch(row);
      spatial.setActive(start);
      spatial.remove(middle);
      spatial.move(direction);
      expect(spatial.getActive()).toBe(end);
    });
  }

  // Group navigation
  xit('can navigate to a sibling node within the group', () => {});
  xit('navigates to a parent sibling node when no siblings within its own group accept navigation', () => {});
  xit('can set a new node as active', () => {});
  xit('reuses group memory by activating the memorized node', () => {});
  xit('activates the nearest child node when navigating to a group without memory', () => {});
  xit('activates the first child node when navigating to a group without memory and no nearest node', () => {});
});

const exampleNodes = () => {
  const nodes = fourNodesInASquare();
  return {
    nodes,
    defaultNode: nodes[2]
  };
};

const fourNodesInASquare = () => [
  createNode(20, 0, 20), // top right
  createNode(20, 20, 20), // bottom right
  createNode(0, 0, 20), // top left
  createNode(0, 20, 20) // bottom left
];
