import { TileState } from "./enums";
import { Ship } from "./ship";

export class Tile {
  index!: number;
  state: TileState = TileState.Close;
  ship?: Ship;

  constructor(index: number) {
    this.index = index;
  }

  hit() {
    this.state = TileState.Open;
    this.ship?.hit();
  }

  static create(index: number) {
    return new Tile(index);
  }
}

