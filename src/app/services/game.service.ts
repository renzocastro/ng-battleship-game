import { Injectable } from '@angular/core';
import { Difficult } from '../battleship-game/enums';
import { LeaderboardData } from '../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _leaderboardData: LeaderboardData[] = [];
  public difficult: Difficult = Difficult.Easy;

  addLeaderboardData(attemps: number) {
    this._leaderboardData.push(new LeaderboardData(attemps));
  }

  getLeaderboardList(): LeaderboardData[] {
    return [...this._leaderboardData];
  }

  getDifficultAsText(): string {
    let difficultText = '';

    switch(this.difficult) {
      case Difficult.Easy:
        difficultText = 'EASY';
        break;
      case Difficult.Normal:
        difficultText = 'NORMAL';
        break;
      case Difficult.Hard:
        difficultText = 'HARD';
        break;
    }

    return difficultText;
  }

}
