export type TeamBasicInfoType = {
  teamName: string;
  nickName: string;
  teamLogo: string;
  shortName?: string;
};

export interface ITeamsByDivisionContent {
  division: string;
  teams: TeamBasicInfoType[];
}

export interface IMainCarouselContent {
  heading: string;
  paragraph_1: string;
  paragraph_2: string;
  link: string;
  image: string;
  paginationText: string;
}

export interface ITableColumns {
  title: string;
  dataIndex: string;
  key: string;
  width?: number;
  align?: 'center' | 'left';
  fixed?: 'left';
  render?: (tdContent: string | null) => string | null;
  sorter?: (a: any, b: any) => number;
  onCell?: (text: any) => any;
}

export interface ILatestNewsSources {
  name: string;
  query: string;
}

export interface IStatsSeasonTypes {
  type: string;
  query: string;
}
