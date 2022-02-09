import { Component, OnInit } from '@angular/core';
import { Difficult, Player, TileState } from 'src/app/battleship-game/enums';
import { Game } from 'src/app/battleship-game/game';
import { Tile } from 'src/app/battleship-game/tile';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  boardWidth = 500;
  tileSize = 0;
  game!: Game;
  wait = false;
  difficultText = '';

  constructor(private _gameService: GameService) {
    this.game = new Game({
      boardCols: 10,
      boardRows: 10
    });

    this.game.setDifficult(this._gameService.difficult);
    this.difficultText = this._gameService.getDifficultAsText();

    this.tileSize = this.boardWidth / this.game.settings.boardCols;
  }

  startGame() {
    this.wait = false;
    this.game.start();
  }

  shuffle() {
    this.game.board1.build();
  }

  onTileClick(tile: Tile
  ) {
    if (!this.game.started || this.isTileStateOpen(tile) || this.wait) {
      return;
    }

    this.wait = true;
    // this.game.turn = Player.None;
    tile.hit();

    setTimeout(() => {
      if (this.game.whoWin() !== Player.None) {
        // TODO: END GAME
        // this._gameService.addLeaderboardData(this.game.);
        alert("END GAME!");
      } else {
        this.game.turn = Player.Two;
        this.game.playCPU();

        setTimeout(() => {
          this.wait = false;
          this.game.turn = Player.One;
        }, 500);
      }
    }, 500);
  }

  isTileStateOpen(tile: Tile) {
    return tile.state === TileState.Open;
  }

  isTurnOfPlayerOne() {
    return this.game.turn === Player.One;
  }

  isTurnOfPlayerTwo() {
    return this.game.turn === Player.Two;
  }

}
