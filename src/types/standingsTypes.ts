import { ITeamsStandingsRender } from './apiNbaTypes';

export type GroupByType = 'conference' | 'division';

export interface IStandingsTableProps {
  filteredTeamsByGroup: ITeamsStandingsRender[][];
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
    teamsStandings: ITeamsStandingsRender[],
    groupData: string[] | string,
    groupName: GroupByType,
  ): ITeamsStandingsRender[] | ITeamsStandingsRender[][];
}

export interface IStandingsTableCbFunctions {
  (
    groupTeams: ITeamsStandingsRender[],
    idx: number,
    arrayToMap: ITeamsStandingsRender[][],
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
    team: ITeamsStandingsRender,
    idx: number,
    arr: ITeamsStandingsRender[],
  ): IStandingsTableDataSource;
}
