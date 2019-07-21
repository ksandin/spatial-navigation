import { SpatialNode } from './SpatialNode';

export class SpatialElement extends SpatialNode {
  get acceptsNavigation() {
    return !!this.domElement;
  }

  constructor(public domElement?: Element | null) {
    super();
  }
}
