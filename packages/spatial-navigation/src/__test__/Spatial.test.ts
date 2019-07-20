import { Spatial } from '../Spatial';
import { createNode } from './createNode';

describe('Spatial', () => {
  // Adding nodes
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
