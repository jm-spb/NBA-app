import { IFetchNbaGameBoxScore } from '../types/apiNbaTypes';
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

// Only need in GameBoxScorePage tables. In other tables  - colSpan: 1 (nothing happens)
// colSpan: 0 - collapsed columns
// if minutesToSort === 0 or null, then columns will be collapsed
const sharedOnCell = (data: IFetchNbaGameBoxScore) => {
  if (data.minutesToSort === undefined) return { colSpan: 1 };
  if (data.minutesToSort > 0) return { colSpan: 1 };
  return { colSpan: 0 };
};

const baseTableColumns: ITableColumns[] = [
  {
    title: 'FGM',
    dataIndex: 'fgm',
    key: 'fgm',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'FGA',
    dataIndex: 'fga',
    key: 'fga',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'FG%',
    dataIndex: 'fgp',
    key: 'fgp',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: '3PM',
    dataIndex: 'tpm',
    key: 'tpm',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: '3PA',
    dataIndex: 'tpa',
    key: 'tpa',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: '3P%',
    dataIndex: 'tpp',
    key: 'tpp',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'FTM',
    dataIndex: 'ftm',
    key: 'ftm',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'FTA',
    dataIndex: 'fta',
    key: 'fta',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'FT%',
    dataIndex: 'ftp',
    key: 'ftp',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'OREB',
    dataIndex: 'offReb',
    key: 'offReb',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'DREB',
    dataIndex: 'defReb',
    key: 'defReb',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'REB',
    dataIndex: 'totReb',
    key: 'totReb',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'AST',
    dataIndex: 'assists',
    key: 'assists',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'STL',
    dataIndex: 'steals',
    key: 'steals',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'BLK',
    dataIndex: 'blocks',
    key: 'blocks',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'TO',
    dataIndex: 'turnovers',
    key: 'turnovers',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'PF',
    dataIndex: 'pFouls',
    key: 'pFouls',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: 'PTS',
    dataIndex: 'points',
    key: 'points',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
  {
    title: '+/-',
    dataIndex: 'plusMinus',
    key: 'plusMinus',
    align: 'center' as const,
    onCell: sharedOnCell,
  },
];

export const gameDetailsBaseStatsColumns: ITableColumns[] = [
  {
    title: 'TEAM',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    fixed: 'left',
  },
  ...baseTableColumns,
];

export const gameDetailsAdditionalStatsColumns: ITableColumns[] = [
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

export const boxScoreStatsColumns: ITableColumns[] = [
  {
    title: 'PLAYER',
    dataIndex: 'player',
    key: 'player',
    width: 200,
    fixed: 'left',
  },
  {
    title: 'MIN',
    dataIndex: 'min',
    key: 'min',
    align: 'left' as const,
    render: (tdContent: string | null): string | null => {
      if (tdContent === null) return 'DND - Injury/Illness';
      const minutesPlayed = Number(tdContent.split(':').join(''));
      if (minutesPlayed === 0) return "DNP - Coach's Decision";
      return tdContent;
    },
    onCell: (data: IFetchNbaGameBoxScore) => ({
      colSpan: data.minutesToSort ? 1 : 20,
    }),
  },
  ...baseTableColumns,
];
