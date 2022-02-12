import { Component, OnInit } from '@angular/core';
import { Difficult } from 'src/app/battleship-game/enums';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  difficult: String = this._gameService.getDifficultAsText();

  private _difficultDict = {
    EASY: Difficult.Easy,
    NORMAL: Difficult.Normal,
    HARD: Difficult.Hard,
  };

  constructor(private _gameService: GameService) { }

  changeDifficultTo(difficult: 'EASY' | 'NORMAL' | 'HARD') {
    this.difficult = difficult;
    this._gameService.difficult = this._difficultDict[difficult];
  }

}
