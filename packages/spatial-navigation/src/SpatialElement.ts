import { SpatialNode } from './SpatialNode';

export class SpatialElement extends SpatialNode {
  constructor(public domElement: Element) {
    super();
  }

  get id() {
    const {
      left,
      top,
      width,
      height
    } = this.domElement.getBoundingClientRect();
    return `{x: ${left}, y: ${top}, width: ${width}, height: ${height}}`;
  }
}
