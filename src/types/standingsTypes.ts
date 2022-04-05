import { ITeamsStandingsRender } from './apiNbaTypes';

export interface IStandingsTableProps {
  teamsStandings: ITeamsStandingsRender[];
  isFetching: boolean;
  groupBy: 'conference' | 'division';
}

export interface IStandingsPickerProps {
  seasons: string[];
  onSeasonChange: (key: string) => void;
  onGroupChange: (key: 'conference' | 'division') => void;
}
