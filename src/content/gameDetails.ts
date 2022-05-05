import { ITableColumns } from '../types/contentTypes';

export const gameSummaryTableColumns: ITableColumns[] = [
  {
    title: 'TEAM',
    dataIndex: 'team',
    key: 'team',
    width: 150,
  },
  {
    title: 'Q1',
    dataIndex: 'q1',
    key: 'q1',
    align: 'center' as const,
  },
  {
    title: 'Q2',
    dataIndex: 'q2',
    key: 'q2',
    align: 'center' as const,
  },

  {
    title: 'Q3',
    dataIndex: 'q3',
    key: 'q3',
    align: 'center' as const,
  },
  {
    title: 'Q4',
    dataIndex: 'q4',
    key: 'q4',
    align: 'center' as const,
  },
  {
    title: 'FINAL',
    dataIndex: 'final',
    key: 'final',
    align: 'center' as const,
  },
];

export const teamsBaseStatsTableColumns: ITableColumns[] = [
  {
    title: 'TEAM',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'FGM',
    dataIndex: 'fgm',
    key: 'fgm',
    align: 'center' as const,
  },
  {
    title: 'FGA',
    dataIndex: 'fga',
    key: 'fga',
    align: 'center' as const,
  },
  {
    title: 'FG%',
    dataIndex: 'fgp',
    key: 'fgp',
    align: 'center' as const,
  },
  {
    title: '3PM',
    dataIndex: 'tpm',
    key: 'tpm',
    align: 'center' as const,
  },
  {
    title: '3PA',
    dataIndex: 'tpa',
    key: 'tpa',
    align: 'center' as const,
  },
  {
    title: '3P%',
    dataIndex: 'tpp',
    key: 'tpp',
    align: 'center' as const,
  },
  {
    title: 'FTM',
    dataIndex: 'ftm',
    key: 'ftm',
    align: 'center' as const,
  },
  {
    title: 'FTA',
    dataIndex: 'fta',
    key: 'fta',
    align: 'center' as const,
  },
  {
    title: 'FT%',
    dataIndex: 'ftp',
    key: 'ftp',
    align: 'center' as const,
  },
  {
    title: 'OREB',
    dataIndex: 'offReb',
    key: 'offReb',
    align: 'center' as const,
  },
  {
    title: 'DREB',
    dataIndex: 'defReb',
    key: 'defReb',
    align: 'center' as const,
  },
  {
    title: 'REB',
    dataIndex: 'totReb',
    key: 'totReb',
    align: 'center' as const,
  },
  {
    title: 'AST',
    dataIndex: 'assists',
    key: 'assists',
    align: 'center' as const,
  },
  {
    title: 'STL',
    dataIndex: 'steals',
    key: 'steals',
    align: 'center' as const,
  },
  {
    title: 'BLK',
    dataIndex: 'blocks',
    key: 'blocks',
    align: 'center' as const,
  },
  {
    title: 'TO',
    dataIndex: 'turnovers',
    key: 'turnovers',
    align: 'center' as const,
  },
  {
    title: 'PF',
    dataIndex: 'pFouls',
    key: 'pFouls',
    align: 'center' as const,
  },
  {
    title: 'PTS',
    dataIndex: 'points',
    key: 'points',
    align: 'center' as const,
  },
  {
    title: '+/-',
    dataIndex: 'plusMinus',
    key: 'plusMinus',
    align: 'center' as const,
  },
];

export const teamsAdditionalStatsTableColumns: ITableColumns[] = [
  {
    title: 'TEAM',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'Points In Paint',
    dataIndex: 'pointsInPaint',
    key: 'pointsInPaint',
    align: 'center' as const,
  },
  {
    title: 'Fastbreak Points',
    dataIndex: 'fastBreakPoints',
    key: 'fastBreakPoints',
    align: 'center' as const,
  },
  {
    title: 'Biggest Lead',
    dataIndex: 'biggestLead',
    key: 'biggestLead',
    align: 'center' as const,
  },
  {
    title: 'Second Chance Points',
    dataIndex: 'secondChancePoints',
    key: 'secondChancePoints',
    align: 'center' as const,
  },
  {
    title: 'Points Off Turnovers',
    dataIndex: 'pointsOffTurnovers',
    key: 'pointsOffTurnovers',
    align: 'center' as const,
  },
  {
    title: 'Longest Run',
    dataIndex: 'longestRun',
    key: 'longestRun',
    align: 'center' as const,
  },
];
