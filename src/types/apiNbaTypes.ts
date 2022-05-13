export type BaseStatsType = ITeamShortInfo & ITeamBaseStats;
export type AdditionalStatsType = ITeamShortInfo & ITeamAdditionalStats;

interface ITeamInfoInApiRespone {
  id: number;
  name: string;
  nickname: string;
  code: string;
  logo: string;
}

interface IApiNbaInitialResponse {
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

interface IGameSummaryArena {
  name: string;
  city: string;
  state: string;
  country: string;
}

interface IGameSummaryScore {
  team: string;
  linescore: string[];
  final: number;
}

interface IFetchScoreboardGamesApiResponse {
  id: number;
  league: string;
  season: number;
  date: { start: string; end: string; duration: string };
  stage: number;
  status: { clock: null; halftime: boolean; short: number; long: string };
  periods: { current: number; total: number; endOfPeriod: boolean };
  arena: IGameSummaryArena;
  teams: {
    visitors: ITeamInfoInApiRespone;
    home: ITeamInfoInApiRespone;
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

interface IGameDetailsTeamStatsRespone {
  team: ITeamInfoInApiRespone;
  statistics: (ITeamBaseStats & ITeamAdditionalStats)[];
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

export interface IFetchScoreboardGamesData extends IApiNbaInitialResponse {
  response: IFetchScoreboardGamesApiResponse[];
}

export interface IFetchScoreboardGames {
  gameId: number;
  startTime: string;
  statusGame: string;
  season?: number;
  teamsInfo: ITeamsInfo;
  summary?: IGameSummary;
}

export interface IGameSummary {
  gameId?: number;
  date: string;
  arena: IGameSummaryArena;
  officials: string[];
  scores: IGameSummaryScore[];
}

export interface IFetchTeamsStandingsResponse {
  league: string;
  season: string;
  team: ITeamInfoInApiRespone;
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

export interface IFetchTeamsStandings {
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

export interface IBoxScoreTableTotals {
  fgm: number | JSX.Element;
  fga: number;
  fgp: string;
  ftm: number;
  fta: number;
  ftp: string;
  tpm: number | JSX.Element;
  tpa: number;
  tpp: string;
  offReb: number;
  defReb: number;
  totReb: number | JSX.Element;
  assists: number | JSX.Element;
  pFouls: number;
  steals: number | JSX.Element;
  turnovers: number;
  blocks: number | JSX.Element;
  points: number | JSX.Element;
}

export interface ITeamBaseStats extends IBoxScoreTableTotals {
  plusMinus: string;
  min?: string;
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

export interface IFetchGameDetailsApiResponse extends IApiNbaInitialResponse {
  response: IGameDetailsTeamStatsRespone[];
}

export interface IFetchGameDetailsTeamStats {
  baseStats: BaseStatsType[];
  additionalStats: AdditionalStatsType[];
}

export interface IFetchGameBoxScoreApiResponse extends ITeamBaseStats {
  player: { id: number; firstname: string; lastname: string };
  team: ITeamInfoInApiRespone;
  game: { id: number };
}

export interface IFetchNbaGameBoxScore extends ITeamBaseStats {
  gameId: number;
  firstname: string;
  lastname: string;
  teamName: string;
  minutesToSort?: number;
}
