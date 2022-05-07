interface IApiNbaBaseResponse {
  errors: any;
  get: string;
  parameters: any;
  results: number;
}

interface ITeamShortInfo {
  id: number;
  name: string;
  logo: string;
}

export interface IFetchScoreboardGamesData extends IApiNbaBaseResponse {
  response: IFetchScoreboardGamesResponse[];
}

type TeamInfoResponseType = {
  id: number;
  name: string;
  nickname: string;
  code: string;
  logo: string;
};

interface IFetchScoreboardGamesResponse {
  id: number;
  league: string;
  season: number;
  date: { start: string; end: string; duration: string };
  stage: number;
  status: { clock: null; halftime: boolean; short: number; long: string };
  periods: { current: number; total: number; endOfPeriod: boolean };
  arena: GameSummaryArenaType;
  teams: {
    visitors: TeamInfoResponseType;
    home: TeamInfoResponseType;
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
  season?: number;
  teamsInfo: ITeamsInfo;
  summary?: IGameSummary;
}

interface ITeamFullInfo {
  teamId: number;
  fullName: string;
  shortName: string;
  logo: string;
  points: number;
  totalWin?: number;
  totalLoss?: number;
  winCaret?: string;
}

export interface IGameSummary {
  gameId?: number;
  date: string;
  arena: GameSummaryArenaType;
  officials: string[];
  scores: GameSummaryScoreType[];
}

export type GameSummaryArenaType = {
  name: string;
  city: string;
  state: string;
  country: string;
};

export type GameSummaryScoreType = {
  team: string;
  linescore: string[];
  final: number;
};

export interface IFetchTeamsStandingsResponse {
  league: string;
  season: string;
  team: TeamInfoResponseType;
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
  nickName: string;
  shortName: string;
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
  homeTeamInfo: ITeamFullInfo;
  visitorTeamInfo: ITeamFullInfo;
}

export interface ITeamBaseStats {
  points: number;
  fgm: number;
  fga: number;
  fgp: string;
  ftm: number;
  fta: number;
  ftp: string;
  tpm: number;
  tpa: number;
  tpp: string;
  offReb: number;
  defReb: number;
  totReb: number;
  assists: number;
  pFouls: number;
  steals: number;
  turnovers: number;
  blocks: number;
  plusMinus: string;
  min: string;
  pos?: string;
  comment?: any;
}

export interface ITeamAdditionalStats {
  fastBreakPoints: number;
  pointsInPaint: number;
  biggestLead: number;
  secondChancePoints: number;
  pointsOffTurnovers: number;
  longestRun: number;
}

export interface IGameDetailsTeamStatsResponse extends IApiNbaBaseResponse {
  response: IGameDetailsTeamStatsFetched[];
}

interface IGameDetailsTeamStatsFetched {
  team: TeamInfoResponseType;
  statistics: (ITeamBaseStats & ITeamAdditionalStats)[];
}

export type BaseStatsType = ITeamShortInfo & ITeamBaseStats;
export type AdditionalStatsType = ITeamShortInfo & ITeamAdditionalStats;

export interface IGameDetailsTeamStatsRender {
  baseStats: BaseStatsType[];
  additionalStats: AdditionalStatsType[];
}

export interface IFetchGameBoxScoreApiResponse extends ITeamBaseStats {
  player: { id: number; firstname: string; lastname: string };
  team: TeamInfoResponseType;
  game: { id: number };
}

export interface IFetchNbaGameBoxScore extends ITeamBaseStats {
  gameId: number;
  firstname: string;
  lastname: string;
  teamName: string;
}
