import { SpatialGroup } from './SpatialGroup';

export abstract class SpatialNode {
  private changeListeners: SpatialNodeChangeListener[] = [];

  parent?: SpatialGroup;

  get isRoot() {
    return !this.parent;
  }

  get isLocalCursor() {
    return this.parent ? this.parent.localCursor === this : false;
  }

  get isCursor() {
    let next: SpatialNode | undefined = this; // tslint:disable-line
    while (next && !next.isRoot) {
      if (!next.isLocalCursor) {
        return false;
      }
      next = next.parent;
    }
    return true;
  }

  get acceptsNavigation() {
    return true;
  }

  get siblings() {
    return this.parent ? this.parent.nodes.filter(node => node !== this) : [];
  }

  setAsCursor() {
    let next: SpatialNode | undefined = this; // tslint:disable-line
    while (next) {
      if (next.parent) {
        next.parent.setLocalCursor(next);
      }
      next = next.parent;
    }
    this.emitChange('cursorChanged');
  }

  emitChange(type: SpatialNodeChange) {
    const listeners = this.changeListeners.slice();
    for (const listener of listeners) {
      listener(type);
    }
  }

  subscribeToChanges(listener: SpatialNodeChangeListener) {
    this.changeListeners.push(listener);
    return () => this.unsubscribeFromChanges(listener);
  }

  unsubscribeFromChanges(listener: SpatialNodeChangeListener) {
    const index = this.changeListeners.indexOf(listener);
    if (index !== -1) {
      this.changeListeners.splice(index, 1);
    }
  }
}

export type SpatialNodeChange = 'added' | 'removed' | 'cursorChanged';

export type SpatialNodeChangeListener = (type: SpatialNodeChange) => unknown;
