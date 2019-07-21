import { SpatialGroup } from './SpatialGroup';

const counters = new Map<string, number>();
const getIdFor = (name: string) => {
  const count = (counters.get(name) || 0) + 1;
  counters.set(name, count);
  return `${name}${count}`;
};

export abstract class SpatialNode {
  private theId = getIdFor(this.constructor.name);

  get id() {
    return this.theId;
  }

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
