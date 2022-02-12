import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { LeaderboardDataImpl } from 'src/app/shared/entities';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  displayedColumns: string[] = ['date', 'player', 'difficult', 'attemps'];
  datalist: LeaderboardDataImpl[];

  constructor(private gameService: GameService) {
    this.datalist = this.gameService.getLeaderboardList();
  }

  ngOnInit(): void {

  }

}
