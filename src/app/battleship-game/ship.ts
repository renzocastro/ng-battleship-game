import { ShipDirection } from "./enums";

export class Ship {
  index = -1;
  size = 0;
  indexList: number[] = [];
  direction!: ShipDirection;

  constructor(size: number) {
    this.size = size;
  }

  hit() {
    if (this.size > 0) {
      this.size--;
    }
  }

  static create(size: number, index?: number) {
    const ship = new Ship(size);

    if (typeof index !== 'undefined') {
      ship.index = index;
    }

    return ship;
  }
}
