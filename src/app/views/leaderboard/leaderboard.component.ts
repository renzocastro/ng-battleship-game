import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { LeaderboardData } from 'src/app/shared/entities';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  displayedColumns: string[] = ['date', 'attemps'];
  datalist: LeaderboardData[];

  constructor(private gameService: GameService) {
    // DUMMY DATA
    // this.gameService.addLeaderboardData(12);
    // this.gameService.addLeaderboardData(1);
    // this.gameService.addLeaderboardData(23);
    // this.gameService.addLeaderboardData(35);

    this.datalist = this.gameService.getLeaderboardList();
  }

  ngOnInit(): void {

  }

}
