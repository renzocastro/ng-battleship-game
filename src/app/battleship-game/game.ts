import { Utils } from '../shared/utils';
import { Board } from './board';
import { Difficult, Player, TileState } from './enums';
import { Tile } from './tile';

interface Settings {
  boardCols: number;
  boardRows: number;
  difficult?: Difficult;
}

export class Game {
  board1!: Board;
  board2!: Board;
  settings: Settings = {
    boardCols: 10,
    boardRows: 10,
    difficult: Difficult.Easy,
  };
  turn: Player = Player.None;
  winner: Player = Player.None;
  started = false;
  turnAttemps!: number;
  cpuCatchTileWithShip: Tile | null = null;

  constructor(settings: Settings) {
    this.settings.boardCols = settings.boardCols;
    this.settings.boardRows = settings.boardRows;

    this.createBoards();
  }

  createBoards() {
    const { boardCols: cols, boardRows: rows } = this.settings;

    this.board1 = new Board(cols, rows);
    this.board1.build();

    this.board2 = new Board(cols, rows);
    this.board2.build();
  }

  start() {
    this.turnAttemps = 0;
    this.winner = Player.None;
    this.started = true;
    this.turn = Player.One;
  }

  playCPU(secondPass = false) {
    const tilesClose = this.board1.tiles.filter(tile => tile.state === TileState.Close);

    let randomIndex: number;
    let randomTile: Tile;
    let probability: number;

    if (this.cpuCatchTileWithShip) {
      const ship = this.cpuCatchTileWithShip.ship!;
      randomTile = this.board1.tiles[ship.indexList[ship.size - 1]];
    } else {
      randomIndex = Utils.getRandomRange(0, tilesClose.length - 1);
      randomTile = this.board1.tiles[tilesClose[randomIndex].index];

      switch(this.settings.difficult) {
        case Difficult.Hard:
          // If tile not contains a ship, is probably that CPU can try Its shoot again, but only one time
          probability = Utils.getRandomRange(0, 2);

          if (!randomTile.ship && probability === 0 && !secondPass) {
            this.playCPU(true);
            return;
          }
          break;

        case Difficult.Easy:
          // If tile contains a ship (first time), is probably that CPU could fail the shoot, but only one time
          probability = Utils.getRandomRange(0, 2);

          if (randomTile.ship && probability === 0 && !secondPass) {
            this.playCPU(true);
            return;
          }
          break;
      }

      if (randomTile.ship) {
        randomTile = this.board1.tiles[randomTile.ship.indexList[randomTile.ship.size - 1]];
        this.cpuCatchTileWithShip = randomTile;
      }
    }

    randomTile!.hit();

    if (this.cpuCatchTileWithShip?.ship?.size === 0) {
      this.cpuCatchTileWithShip = null;
    }
  }

  whoWin(): Player {

    return Player.None;
  }

  build() {
    this.board1.build();
    this.board2.build();
  }

  setDifficult(difficult: Difficult) {
    this.settings.difficult = difficult;
  }

}
