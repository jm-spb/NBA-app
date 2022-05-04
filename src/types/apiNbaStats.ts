export interface INbaPlayersStatsRespone {
  player_id?: number;
  player_age: number;
  league_id: string;
  season_id: string;
  team_abbreviation: string;
  team_id: number;
  gp: number;
  gs: number;
  min: number;
  pts: number;
  fgm: number;
  fga: number;
  fg_pct: number;
  fg3m: number;
  fg3a: number;
  fg3_pct: number;
  ftm: number;
  fta: number;
  ft_pct: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  tov: number;
  stl: number;
  blk: number;
  pf: number;
}

export interface INbaPlayersNamesRender {
  id: number;
  full_name: string;
}

export interface INbaPlayersNamesResponse extends INbaPlayersNamesRender {
  first_name: string;
  is_active: number;
  last_name: string;
}

export interface IFetchNbaPlayersStatsParams {
  teamShortName: string;
  selectedSeason: string;
  seasonType: string;
}
