import { SpatialNode } from './SpatialNode';

export class SpatialGroup extends SpatialNode {
  nodes: SpatialNode[] = [];
  localCursor?: SpatialNode;

  get cursor() {
    return getLeafCursor(this);
  }

  get leafs() {
    const queue: SpatialNode[] = [this];
    const leafs: SpatialNode[] = [];
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

  add(...nodes: SpatialNode[]) {
    for (const node of nodes) {
      this.nodes.push(node);
      node.parent = this;
      node.emitChange('added');
    }
    if (!this.localCursor) {
      this.setLocalCursor(nodes[0]);
    }
  }

  remove(...nodes: SpatialNode[]) {
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
          node.parent.setLocalCursor(undefined);
        }
        node.parent = undefined;
      }
      node.emitChange('removed');
    }
    return removed;
  }

  setLocalCursor(node?: SpatialNode) {
    if (this.localCursor === node) {
      return;
    }
    if (node && !this.nodes.includes(node)) {
      throw new Error('A cursor must be one the groups nodes');
    }
    const previousCursor = this.localCursor;
    this.localCursor = node;
    if (previousCursor) {
      previousCursor.emitChange('cursorChanged');
    }
    this.emitChange('cursorChanged');
  }
}

const getLeafCursor = (group: SpatialGroup): SpatialNode | undefined =>
  group.localCursor instanceof SpatialGroup
    ? getLeafCursor(group.localCursor)
    : group.localCursor;
