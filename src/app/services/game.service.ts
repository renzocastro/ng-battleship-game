import { Injectable } from '@angular/core';
import { Difficult } from '../battleship-game/enums';
import { LeaderboardData } from '../shared/entities';

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
      this._leaderboardData = (<any[]>JSON.parse(rawData)).map(item => {
        item.date = new Date(item.date);
        return item;
      });
    }
  }

  private saveData() {
    localStorage.setItem('leaderboard', JSON.stringify(this._leaderboardData));
  }

  addLeaderboardData(attemps: number) {
    this._leaderboardData.push(new LeaderboardData(attemps));
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
