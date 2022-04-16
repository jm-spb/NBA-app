import { ITeamsStandingsRender } from './apiNbaTypes';

type GroupByType = 'conference' | 'division';

export interface IStandingsTableProps {
  teamsStandings: ITeamsStandingsRender[];
  isFetching: boolean;
  groupBy: GroupByType;
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
