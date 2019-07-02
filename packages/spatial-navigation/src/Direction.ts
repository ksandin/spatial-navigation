const directionsBlueprint = { up: 0, right: 0, down: 0, left: 0 };

export type Direction = keyof typeof directionsBlueprint;

export const directions = Object.keys(directionsBlueprint) as Direction[];
