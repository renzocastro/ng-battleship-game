import { Component, OnInit } from '@angular/core';
import { Difficult } from 'src/app/battleship-game/enums';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  difficult: String = this._gameService.getDifficultAsText();

  private _difficultDict = {
    EASY: Difficult.Easy,
    NORMAL: Difficult.Normal,
    HARD: Difficult.Hard,
  };

  constructor(private _gameService: GameService) { }

  ngOnInit(): void {
  }

  changeDifficultTo(difficult: 'EASY' | 'NORMAL' | 'HARD') {
    this._gameService.difficult = this._difficultDict[difficult];
  }

}
