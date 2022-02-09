import { Utils } from "../shared/utils";
import { ShipDirection } from "./enums";
import { Ship } from "./ship";
import { Tile } from "./tile";

export class Board {
  name = '';
  cols = 0;
  rows = 0;
  tiles!: Tile[];
  ships!: Ship[];

  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;
  }

  createShips() {
    this.ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1].map(Ship.create);
  }

  fillTiles() {
    this.tiles = '0'.repeat(this.cols * this.rows).split('')
      .map((s: string, index: number) => Tile.create(index));
  }

  getTilesInUse(): Tile[] {
    return this.tiles.filter((tile: Tile) => !!tile.ship);
  }

  addShip(ship: Ship) {
    this.ships.push(ship);
    this.updateTileWithShip(ship);
  }

  private updateTileWithShip(ship: Ship) {
    ship.indexList.forEach((index: number) => this.tiles[index].ship = ship);
  }

  shootInside(index: number): boolean {
    return true;
  }

  build() {
    this.ships = [];
    this.fillTiles();
    this.createShips();
    this.shuffleShips();
  }

  // TODO: Refactor to recursive function
  // TODO: Use a bound to ships
  shuffleShips() {
    let limitExceeded = false;

    for (let i = 0; i < this.ships.length; i++) {
      const ship = this.ships[i];
      ship.direction = Utils.getRandomRange(0, 1) ? ShipDirection.Horizontal : ShipDirection.Vertical;

      let isTileHorizontal = ship.direction === ShipDirection.Horizontal;
      let tilesInUse = this.getTilesInUse();
      let attempts = 0;
      let attemptsLimit = 10;
      let isRandomPositionOK = false;

      while (!limitExceeded && !isRandomPositionOK) {
        let x: number;
        let y: number;

        //#region Set a random position for the ship within the board boundary
        if (isTileHorizontal) {
          x = Utils.getRandomRange(0, this.cols - ship.size);
          y = Utils.getRandomRange(0, this.rows - 1);
        } else {
          x = Utils.getRandomRange(0, this.cols - 1);
          y = Utils.getRandomRange(0, this.rows - ship.size);
        }
        //#endregion

        //#region Check if tile positions are taken
        let index: number;
        ship.indexList = [];

        for (let j = 0; j < ship.size; j++) {
          if (isTileHorizontal) {
            index = (x + j) + (y * this.cols);
          } else {
            index = x + ((y + j) * this.cols);
          }

          let existsIndex = tilesInUse.filter(tile => tile.index === index).length > 0;

          if (existsIndex) {
            break;
          }

          ship.indexList.push(index);
        }
        //#endregion

        isRandomPositionOK = ship.indexList.length === ship.size;

        if (isRandomPositionOK) {
          this.updateTileWithShip(ship);
        } else {
          attempts++;

          if (attempts > attemptsLimit) {
            limitExceeded = true;
            break;
          }
        }
      }
    }

    if (limitExceeded) {
      this.shuffleShips();
    }
  }
}
