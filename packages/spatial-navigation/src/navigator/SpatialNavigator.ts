import { Rect } from '../math/Rect';
import { Direction } from '../math/Direction';
import { getNearestNodeInDirection } from './getNearestNodeInDirection';
import { SpatialElement } from '../SpatialElement';
import { SpatialNode } from '../SpatialNode';
import { SpatialGroup } from '../SpatialGroup';

export class SpatialNavigator {
  getRectsForNodes(nodes: SpatialNode[]): Rect[] {
    return nodes.map(node => {
      if (node instanceof SpatialElement) {
        return getRectForHTMLElement(node.domElement);
      }
      if (node instanceof SpatialGroup) {
        return Rect.box(this.getRectsForNodes(node.nodes));
      }
      throw new Error(`Node type not supported: ${node}`);
    });
  }

  getNearestNodeInDirection(
    start: SpatialNode,
    candidates: SpatialNode[],
    direction: Direction
  ): SpatialNode | undefined {
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
    cursor: SpatialNode,
    direction: Direction,
    reference: SpatialNode = cursor
  ): SpatialNode | undefined {
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
    cursor: SpatialNode,
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

  removeNodeAndSetCursorToAdjacent(node: SpatialNode) {
    if (node.parent) {
      const adjacent = this.getAdjacentNode(node);
      if (adjacent) {
        const removed = node.parent.remove(node);
        if (removed) {
          adjacent.setAsCursor();
        }
      }
    }
  }

  getDefaultNode(group: SpatialGroup) {
    const candidates = group.leafs;
    const allRect = this.getRectsForNodes(candidates);
    const topLeft = getTopLeftRect(allRect);
    return candidates[allRect.indexOf(topLeft)];
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

const getTopLeftRect = (rect: Rect[]): Rect =>
  rect.slice().sort((a, b) => {
    const s1 = a.x + a.y;
    const s2 = b.x + b.y;
    return s1 - s2;
  })[0];

const getRectForHTMLElement = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return new Rect(rect.left, rect.top, rect.width, rect.height);
};
