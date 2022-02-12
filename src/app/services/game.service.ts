import { Injectable } from '@angular/core';
import { Difficult, Player } from '../battleship-game/enums';
import { LeaderboardData, LeaderboardDataImpl } from '../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _leaderboardData: LeaderboardData[] = [];
  public difficult: Difficult = Difficult.Easy;

  constructor() {
    if (this._leaderboardData.length === 0) {
      this.loadData();
    }
  }

  private loadData() {
    const rawData = localStorage.getItem('leaderboard');

    if (rawData) {
      this._leaderboardData = (<any[]>JSON.parse(rawData))
        .map((item: any) => {
          item.date = new Date(item.date);
          return item;
        })
        .map((item: LeaderboardDataImpl) => LeaderboardData.deserialize(item));
    }
  }

  private saveData() {
    const dataSerialized = this._leaderboardData.map((lData: LeaderboardData) => lData.serialize());
    localStorage.setItem('leaderboard', JSON.stringify(dataSerialized));
  }

  addLeaderboardData(player: Player, attemps: number, difficult: string) {
    this._leaderboardData.push(new LeaderboardData(player, attemps, difficult));
    this.saveData();
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
