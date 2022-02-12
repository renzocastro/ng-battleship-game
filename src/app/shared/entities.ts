import { Player } from "../battleship-game/enums";

export interface LeaderboardDataImpl {
  readonly date: Date;
  readonly attemps: number;
  readonly difficult: string;
  readonly player: Player;
}

export class LeaderboardData implements LeaderboardDataImpl {
  private _date!: Date;
  private _attemps!: number;
  private _difficult: string;
  private _player: Player;

  constructor(player: Player, attemps: number, difficult: string, date?: Date) {
    this._attemps = attemps;
    this._difficult = difficult;
    this._player = player;
    this._date = date || new Date();
  }

  get date(): Date {
    return this._date;
  }

  get attemps(): number {
    return this._attemps;
  }

  get difficult(): string {
    return this._difficult;
  }

  get player(): Player {
    return this._player;
  }

  public serialize(): LeaderboardDataImpl {
    const { date, player, attemps, difficult } = this;
    return <LeaderboardDataImpl>{ date, player, attemps, difficult };
  }

  public static deserialize(data: LeaderboardDataImpl) {
    const dateTyped = typeof data.date === 'string' ? new Date(data.date) : data.date;
    return new LeaderboardData(data.player, data.attemps, data.difficult, dateTyped);
  }
}
