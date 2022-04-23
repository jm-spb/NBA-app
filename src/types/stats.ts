import { INbaPlayersNamesRender, INbaPlayersStatsRespone } from './apiNbaStats';

export interface IStatsTableProps {
  teamId: string;
  selectedSeason: string;
}

export interface IStatsTableDataSource extends INbaPlayersStatsRespone {
  full_name?: string;
}

export interface ICreateTableDataSource<T> {
  (playersStatsData: T[], playersNamesData: INbaPlayersNamesRender[]): T[];
}
