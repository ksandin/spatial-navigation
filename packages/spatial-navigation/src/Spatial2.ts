import { Direction } from './Direction';
import { getRectsForNodes } from './getRectsForNodes';
import { getNearestNodeInDirection } from './getNearestNodeInDirection';
import { Rect } from './Rect';
import { SpatialNode } from './SpatialNode';

const counters = new Map<string, number>();

const getIdFor = (name: string) => {
  const count = (counters.get(name) || 0) + 1;
  counters.set(name, count);
  return `${name}${count}`;
};

export abstract class Node {
  id = getIdFor(this.constructor.name);

  parent?: SpatialGroup;
  get siblings() {
    return this.parent ? this.parent.nodes.filter(node => node !== this) : [];
  }

  setAsCursor() {
    let next: Node | undefined = this; // tslint:disable-line
    while (next) {
      if (next.parent) {
        next.parent.setLocalCursor(next);
      }
      next = next.parent;
    }
  }
}

export class SpatialGroup extends Node {
  nodes: Node[] = [];
  localCursor?: Node;

  get cursor() {
    return getLeafCursor(this);
  }

  get leafs() {
    const queue: Node[] = [this];
    const leafs: Node[] = [];
    while (queue.length) {
      const node = queue.pop()!;
      if (node instanceof SpatialGroup) {
        queue.push(...node.nodes);
      } else {
        leafs.push(node);
      }
    }
    return leafs;
  }

  add(...nodes: Node[]) {
    for (const node of nodes) {
      this.nodes.push(node);
      node.parent = this;
    }
    if (!this.localCursor) {
      this.localCursor = nodes[0];
    }
  }

  remove(...nodes: Node[]) {
    let removed = 0;
    for (const node of nodes) {
      const index = this.nodes.indexOf(node);
      if (index === -1) {
        continue;
      }
      removed += 1;
      this.nodes.splice(index, 1);
      if (node.parent) {
        if (node.parent.localCursor === node) {
          node.parent.localCursor = undefined;
        }
        node.parent = undefined;
      }
    }
    return removed;
  }

  setLocalCursor(node: Node) {
    if (!this.nodes.includes(node)) {
      throw new Error('A cursor must be one the groups nodes');
    }
    this.localCursor = node;
  }
}

export class SpatialElement extends Node {
  constructor(public domElement: SpatialNode) {
    super();
  }
}

export class SpatialNavigator {
  getRectsForNodes(nodes: Node[]): Rect[] {
    return nodes.map(node => {
      if (node instanceof SpatialElement) {
        return getRectsForNodes([node.domElement])[0];
      }
      if (node instanceof SpatialGroup) {
        return Rect.box(this.getRectsForNodes(node.nodes));
      }
      throw new Error(`Node type not supported: ${node}`);
    });
  }

  getNearestNodeInDirection(
    start: Node,
    candidates: Node[],
    direction: Direction
  ): Node | undefined {
    const startRect = this.getRectsForNodes([start])[0];
    const candidateRects = this.getRectsForNodes(candidates);
    const nearestRect = getNearestNodeInDirection(
      startRect,
      candidateRects,
      direction
    );
    return candidates[candidateRects.indexOf(nearestRect!)];
  }

  getAdjacentNodeInAncestry(
    cursor: Node,
    direction: Direction,
    reference: Node = cursor
  ): Node | undefined {
    const nearestNode = this.getNearestNodeInDirection(
      cursor,
      reference.siblings,
      direction
    );
    return (
      nearestNode ||
      (reference.parent
        ? this.getAdjacentNodeInAncestry(cursor, direction, reference.parent)
        : undefined)
    );
  }

  getAdjacentNode(
    cursor: Node,
    directions: Direction[] = ['up', 'right', 'down', 'left']
  ) {
    for (const direction of directions) {
      const adjacentNode = this.getAdjacentNodeInAncestry(cursor, direction);
      if (
        adjacentNode instanceof SpatialGroup &&
        adjacentNode.nodes.length > 0
      ) {
        return (
          this.getNearestNodeInDirection(
            cursor,
            adjacentNode.leafs,
            direction
          ) || adjacentNode.leafs[0]
        );
      }
      if (adjacentNode) {
        return adjacentNode;
      }
    }
  }

  removeNodeAndSetCursorToAdjacent(group: SpatialGroup, node: Node) {
    const adjacent = this.getAdjacentNode(group);
    if (adjacent) {
      const removed = group.remove(node);
      if (removed) {
        adjacent.setAsCursor();
      }
    }
  }

  getDefaultNode(group: SpatialGroup) {
    const allRect = this.getRectsForNodes(group.leafs);
    const topLeft = getTopLeftRect(allRect);
    return group.nodes[allRect.indexOf(topLeft)];
  }

  navigate(group: SpatialGroup, direction: Direction) {
    const newCursor = group.cursor
      ? this.getAdjacentNodeInAncestry(group.cursor, direction)
      : this.getDefaultNode(group);
    if (newCursor) {
      newCursor.setAsCursor();
    }
  }
}

const getLeafCursor = (group: SpatialGroup): Node | undefined =>
  group.localCursor instanceof SpatialGroup
    ? getLeafCursor(group.localCursor)
    : group.localCursor;

const getTopLeftRect = (rect: Rect[]): Rect =>
  rect.slice().sort((a, b) => {
    const s1 = a.x + a.y;
    const s2 = b.x + b.y;
    return s1 - s2;
  })[0];
