export function getAngleDelta(a: number, b: number) {
  return Math.PI - Math.abs(Math.abs(a - b) - Math.PI);
}
