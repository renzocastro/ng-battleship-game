export class LeaderboardData {
  private _date!: Date;
  private _attemps!: number;

  constructor(attemps: number) {
    this._date = new Date();
    this._attemps = attemps;
  }

  get date(): Date {
    return this._date;
  }

  get attemps(): number {
    return this._attemps;
  }

  toString(): string {
    return `${this._date.toLocaleString()} - Attemps: ${this._attemps}`;
  }
}
