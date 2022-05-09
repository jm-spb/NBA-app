import { IFetchTeamsStandings } from './apiNbaTypes';

export type GroupByType = 'conference' | 'division';

export interface IStandingsTableProps {
  filteredTeamsByGroup: IFetchTeamsStandings[][];
}

export interface IStandingsPickerProps {
  seasons: string[];
  onSeasonChange: (key: string) => void;
  onGroupChange: (key: GroupByType) => void;
}

export interface IFormatSeasons {
  (avaliableSeasons: number[]): string[];
}

export interface IFilterTeamsByGroup {
  (
    teamsStandings: IFetchTeamsStandings[],
    groupData: string[] | string,
    groupName: GroupByType,
  ): IFetchTeamsStandings[] | IFetchTeamsStandings[][];
}

export interface IStandingsTableCbFunctions {
  (
    groupTeams: IFetchTeamsStandings[],
    idx: number,
    arrayToMap: IFetchTeamsStandings[][],
  ): JSX.Element;
}

interface IStandingsTableDataSource {
  key: number;
  team: JSX.Element;
  totalWin: number;
  totalLoss: number;
  winPercentage: string;
  gamesBehind: string;
  conf: string;
  div: string;
  home: string;
  road: string;
  last10: string;
  streak: string;
}

export interface IStandingsTableCreateDataSource {
  (
    team: IFetchTeamsStandings,
    idx: number,
    arr: IFetchTeamsStandings[],
  ): IStandingsTableDataSource;
}
