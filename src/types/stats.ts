import { INbaPlayersNamesRender, INbaPlayersStatsRespone } from './apiNbaStats';
import { ITeamsByDivisionContent, TeamBasicInfoType } from './contentTypes';

export interface IStatsTableProps {
  dataSource: IStatsTableDataSource[];
  isFetching: boolean;
}

export interface IStatsTableDataSource extends INbaPlayersStatsRespone {
  full_name?: string;
}

export interface ICreateTableDataSource<T> {
  (playersStatsData: T[], playersNamesData: INbaPlayersNamesRender[]): T[];
}

export interface IGetTeamPickerContent {
  (content: ITeamsByDivisionContent[]): TeamBasicInfoType[];
}
