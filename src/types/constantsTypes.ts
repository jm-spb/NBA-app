export interface IHeaderTeamsDropdown {
  division: string;
  teams: { teamName: string; nickName: string; teamLogo: string }[];
}

export interface IMainCarouselContent {
  heading: string;
  paragraph_1: string;
  paragraph_2: string;
  link: string;
  image: string;
  paginationText: string;
}

export interface IStandingsTableColumns {
  title: string;
  dataIndex: string;
  key: string;
  width?: number;
  align?: 'center';
}
