import { Direction } from './Direction';
import { getNearestNodeInDirection } from './getNearestNodeInDirection';
import { SpatialChangeHandler } from './SpatialChangeHandler';
import { SpatialNode } from './SpatialNode';
import { getRectsForNodes } from './getRectsForNodes';
import { Rect } from './Rect';
import { SpatialMeta } from './SpatialMeta';

export class Spatial {
  private active?: SpatialNode;
  private nodes: SpatialNode[] = [];
  private meta = new WeakMap<SpatialNode, SpatialMeta>();
  private changeHandlers: SpatialChangeHandler[] = [];

  isActive(node: SpatialNode) {
    return this.active === node;
  }

  getActive() {
    return this.active;
  }

  getActiveMeta() {
    return this.meta.get(this.active!);
  }

  setActive(newActive?: SpatialNode) {
    const oldActive = this.active;
    this.active = newActive;
    if (oldActive !== newActive) {
      this.emitChange(oldActive, newActive);
    }
  }

  add(node: SpatialNode, meta?: SpatialMeta, refresh = true) {
    if (node) {
      this.meta.set(node, meta);
    }
    this.nodes.push(node);
    if (refresh) {
      this.refresh();
    }
  }

  addBatch(batch: SpatialNode[], refresh = true) {
    batch.forEach(node => this.add(node, undefined, false));
    if (refresh) {
      this.refresh();
    }
  }

  refresh() {
    if (!this.active) {
      this.setActive(this.getDefaultNode());
    }
  }

  remove(node: SpatialNode) {
    if (node) {
      this.meta.delete(node);
    }
    const nodeIndex = this.nodes.indexOf(node);
    if (nodeIndex !== -1) {
      if (this.active === node) {
        this.setActive(this.getAdjacentNode());
      }
      this.nodes.splice(nodeIndex, 1);
    }
  }

  move(direction: Direction) {
    if (!this.active) {
      this.setActive(this.getDefaultNode());
    } else {
      const newActive = this.getAdjacentNode([direction]);
      if (newActive) {
        this.setActive(newActive);
      }
    }
  }

  getAdjacentNode(directions: Direction[] = ['up', 'right', 'down', 'left']) {
    if (!this.active) {
      return;
    }
    const allRect = getRectsForNodes(this.nodes);
    const activeRect = allRect[this.nodes.indexOf(this.active)];
    const candidateRect = allRect.filter(item => item !== activeRect);
    for (const direction of directions) {
      const nearestRect = getNearestNodeInDirection(
        activeRect,
        candidateRect,
        direction
      );
      const node = this.nodes[allRect.indexOf(nearestRect!)];
      if (node) {
        return node;
      }
    }
  }

  getDefaultNode() {
    const allRect = getRectsForNodes(this.nodes);
    const topLeft = getTopLeftRect(allRect);
    return this.nodes[allRect.indexOf(topLeft)];
  }

  subscribeToChanges(handler: SpatialChangeHandler) {
    this.changeHandlers.push(handler);
    return () => {
      const index = this.changeHandlers.indexOf(handler);
      if (index !== -1) {
        this.changeHandlers.splice(index, 1);
      }
    };
  }

  private emitChange: SpatialChangeHandler = (oldActive, newActive) =>
    this.changeHandlers.forEach(emit => emit(oldActive, newActive));
}

function getTopLeftRect(rect: Rect[]): Rect {
  return rect.slice().sort((a, b) => {
    const s1 = a.x + a.y;
    const s2 = b.x + b.y;
    return s1 - s2;
  })[0];
}
