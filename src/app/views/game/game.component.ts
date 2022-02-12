import { Component, OnInit } from '@angular/core';
import { Difficult, Player, TileState } from 'src/app/battleship-game/enums';
import { Game } from 'src/app/battleship-game/game';
import { Tile } from 'src/app/battleship-game/tile';
import { GameService } from 'src/app/services/game.service';
import { MatDialog } from '@angular/material/dialog';
import { WinnerDialogComponent } from './dialogs/winner.dialog/winner-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private _gameService: GameService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
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

  onTileClick(tile: Tile) {
    if (!this.game.started || this.isTileStateOpen(tile) || this.wait) {
      return;
    }

    this.wait = true;
    tile.hit();

    setTimeout(() => {
      let isThereAWinner = this.checkForAWinner();

      if (!isThereAWinner) {
        this.game.turn = Player.Two;
        this.game.playCPU();

        isThereAWinner = this.checkForAWinner();

        if (!isThereAWinner) {
          setTimeout(() => {
            this.wait = false;
            this.game.turn = Player.One;
          }, 500);
        }
      }

    }, 500);
  }

  checkForAWinner(): boolean {
    const winner = this.game.whoWin();

    if (winner !== Player.None) {
      this.setWinner(winner);
      return true;
    } else {
      return false;
    }
  }

  private setWinner(winner: Player) {
    this.game.turn = Player.None;

    let attemps = 0;

    if (winner === Player.One) {
      attemps = this.game.board2.getTotalTilesOpen();
    } else if (winner === Player.Two) {
      attemps = this.game.board1.getTotalTilesOpen();
    }

    this._gameService.addLeaderboardData(winner, attemps, this._gameService.getDifficultAsText());

    this.showWinnerDialog(winner);
  }

  showWinnerDialog(winner: string) {
    const dialogRef = this._dialog.open(WinnerDialogComponent, {
      data: winner
    });
    dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['/leaderboard']);
    });
  }

  getRowCol(index: number): string {
    const col = index % this.game.settings.boardCols;
    const row = Math.floor(index / this.game.settings.boardRows);
    const rows = 'ABCDEFGHIJ'.split('');

    return `${rows[row]}${col}`;
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
