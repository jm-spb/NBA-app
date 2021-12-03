export interface IScoreboardGamesResponse extends IScoreboardGamesRender {
  EndOfPeriod: string;
  arena: string;
  city: string;
  clock: string;
  country: string;
  currentPeriod: string;
  endTimeUTC: string;
  gameDuration: string;
  gameId: string;
  halftime: string;
  league: string;
  seasonStage: string;
  seasonYear: string;
  statusGame: string;
  statusShortGame: string;
}

export interface IScoreboardGamesRender {
  startTimeUTC: string;
  hTeam: ScoreboardTeam;
  vTeam: ScoreboardTeam;
}

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
