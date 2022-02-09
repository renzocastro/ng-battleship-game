import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './views/game/game.component';
import { LeaderboardComponent } from './views/leaderboard/leaderboard.component';
import { SettingsComponent } from './views/settings/settings.component';
import { StartComponent } from './views/start/start.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'game', component: GameComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
