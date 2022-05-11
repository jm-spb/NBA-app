import {
  IBoxScoreTableTotals,
  IFetchNbaGameBoxScore,
  ITeamBaseStats,
} from './apiNbaTypes';

interface ITableData extends ITeamBaseStats {
  player: JSX.Element;
  gameId: number;
  teamName: string;
}

export interface ICreateDataSourceByTeam {
  (stats: IFetchNbaGameBoxScore): ITableData;
}

export interface ITotalsDataReducer {
  (totals: IBoxScoreTableTotals, player: ITableData): IBoxScoreTableTotals;
}

export interface ICreateSummaryRow {
  (tableData: readonly ITableData[]): JSX.Element;
}

export interface ICreateTableByTeam {
  (team: IFetchNbaGameBoxScore[], idx: number): JSX.Element;
}
