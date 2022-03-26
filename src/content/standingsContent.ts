import { IStandingsTableColumns } from '../types/contentTypes';

const standingsTableColumns: IStandingsTableColumns[] = [
  {
    title: 'TEAM',
    dataIndex: 'team',
    key: 'team',
    width: 250,
  },
  {
    title: 'WIN',
    dataIndex: 'totalWin',
    key: 'totalWin',
    align: 'center' as const,
  },
  {
    title: 'LOSS',
    dataIndex: 'totalLoss',
    key: 'totalLoss',
    align: 'center' as const,
  },
  {
    title: 'WIN%',
    dataIndex: 'winPercentage',
    key: 'winPercentage',
    align: 'center' as const,
  },
  {
    title: 'GB',
    dataIndex: 'gamesBehind',
    key: 'gamesBehind',
    align: 'center' as const,
  },
  {
    title: 'CONF',
    dataIndex: 'conf',
    key: 'conf',
    align: 'center' as const,
  },
  {
    title: 'DIV',
    dataIndex: 'div',
    key: 'div',
    align: 'center' as const,
  },
  {
    title: 'HOME',
    dataIndex: 'home',
    key: 'home',
    align: 'center' as const,
  },
  {
    title: 'ROAD',
    dataIndex: 'road',
    key: 'road',
    align: 'center' as const,
  },
  {
    title: 'LAST 10',
    dataIndex: 'last10',
    key: 'last10',
    align: 'center' as const,
  },
  {
    title: 'STREAK',
    dataIndex: 'streak',
    key: 'streak',
    align: 'center' as const,
  },
];

export default standingsTableColumns;
