export interface IScoreboardFullData {
  api: Api;
}

export interface IScoreboardResponse extends IScoreboardGames {
  EndOfPeriod: string;
  arena: string;
  city: string;
  clock: string;
  country: string;
  currentPeriod: string;
  endTimeUTC: string;
  gameDuration: string;
  halftime: string;
  league: string;
  seasonStage: string;
  seasonYear: string;
  statusGame: string;
  statusShortGame: string;
  date?: string;
}

export interface IScoreboardGames {
  startTimeUTC: string;
  hTeam: ScoreboardTeam;
  vTeam: ScoreboardTeam;
  gameId?: string;
  homeTeamWinningCaret?: string;
  visitTeamWinningCaret?: string;
}

export interface IScoreboardDate {
  weekDay: string;
  monthDay: string;
}

// export interface IScoreboardRenderGame {
//   startTime: string,
//   homeTeam: string,

// }
type Api = {
  status: string;
  message: string;
  results: string;
  filters: Array<string>;
  games: IScoreboardResponse[];
};

type ScoreboardTeam = {
  fullName: string;
  logo: string;
  nickName: string;
  score: Score;
  shortName: string;
  teamId: string;
};

type Score = {
  points: string;
};
