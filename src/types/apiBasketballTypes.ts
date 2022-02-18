export interface ITeamsBaseInfoResponseData {
  country: { id: number; name: string; code: string; flag: string };
  description: string;
  form: null;
  games: {
    played: number;
    win: { total: number; percentage: string };
    lose: { total: number; percentage: string };
  };
  group: { name: string; points: number };
  league: { id: number; logo: string; name: string; season: string; type: string };
  points: { for: number; againts: number };
  position: number;
  stage: string;
  team: { id: number; name: string; logo: string };
}

export interface ITeamsBaseInfoRenderData {
  id: number;
  teamName: string;
  logo: string;
  divisionName: string;
  winGames: number;
  loseGames: number;
}
