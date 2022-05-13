import { IPlayersNames, IFetchPlayersStatsApiRespone } from './apiNbaStats';
import { ITeamsByDivisionContent, ITeamShortInfo } from './contentTypes';

export interface IPlayersStatsTableDataSource extends IFetchPlayersStatsApiRespone {
  full_name?: string;
}

export interface ICreateTableDataSource<T> {
  (playersStatsData: T[], playersNamesData: IPlayersNames[]): T[];
}

export interface IGetTeamPickerContent {
  (content: ITeamsByDivisionContent[]): ITeamShortInfo[];
}
