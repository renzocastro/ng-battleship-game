import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  datalist: String[];

  constructor(private gameService: GameService) {
    this.datalist = this.gameService.getLeaderboardList();
  }

  ngOnInit(): void {

  }

}
