import { SpatialGroup } from './SpatialGroup';

export abstract class SpatialNode {
  parent?: SpatialGroup;

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
  }
}
