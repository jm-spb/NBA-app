export interface IFetchScoreboardGamesData {
  errors: any;
  get: string;
  parameters: any;
  response: IFetchScoreboardGamesResponse[];
  results: number;
}

interface IFetchScoreboardGamesResponse {
  id: number;
  league: string;
  season: number;
  date: { start: string; end: string; duration: string };
  stage: number;
  status: { clock: null; halftime: boolean; short: number; long: string };
  periods: { current: number; total: number; endOfPeriod: boolean };
  arena: { name: string; city: string; state: string; country: string };
  teams: {
    visitors: { id: number; name: string; nickname: string; code: string; logo: string };
    home: { id: number; name: string; nickname: string; code: string; logo: string };
  };
  scores: {
    visitors: {
      win: number;
      loss: number;
      series: { win: number; loss: number };
      linescore: string[];
      points: number;
    };
    home: {
      win: number;
      loss: number;
      series: { win: number; loss: number };
      linescore: string[];
      points: number;
    };
  };
  officials: string[];
  timesTied: number;
  leadChanges: number;
  nugget: null;
}

export interface IScoreboardGamesRender {
  gameId: number;
  startTime: string;
  statusGame: string;
  teamsInfo: ITeamsInfo;
}

interface ITeamInfo {
  teamId: number;
  fullName: string;
  shortName: string;
  logo: string;
  points: number;
  totalWin?: number;
  totalLoss?: number;
  winCaret?: string;
}

export interface IFetchTeamsStandingsResponse {
  league: string;
  season: string;
  team: { id: number; name: string; nickname: string; code: string; logo: string };
  conference: { name: string; rank: number; win: number; loss: number };
  division: {
    name: string;
    rank: number;
    win: number;
    loss: number;
    gamesBehind: string;
  };
  win: { home: number; away: number; total: number; percentage: string; lastTen: number };
  loss: {
    home: number;
    away: number;
    total: number;
    percentage: string;
    lastTen: number;
  };
  gamesBehind: string;
  streak: number;
  winStreak: boolean;
  tieBreakerPoints: null;
}

export interface ITeamsStandingsRender {
  teamId: number;
  fullName: string;
  nickname: string;
  logo: string;
  totalWin: number;
  homeWin: number;
  awayWin: number;
  totalLoss: number;
  homeLoss: number;
  awayLoss: number;
  winPercentage: string;
  lastTenWin: number;
  gamesBehind: string;
  streak: number;
  winStreak: boolean;
  conference: { name: string; rank: number; confWin: number; confLoss: number };
  division: { name: string; rank: number; divisionWin: number; divisionLoss: number };
}

export interface ITeamsInfo {
  homeTeamInfo: ITeamInfo;
  visitorTeamInfo: ITeamInfo;
}
