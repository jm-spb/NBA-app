export type HeaderTeamsType = {
  teamName: string;
  nickName: string;
  teamLogo: string;
};

export interface IHeaderTeamsDropdown {
  division: string;
  teams: HeaderTeamsType[];
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
  align?: 'center';
  fixed?: 'left';
  sorter?: (a: any, b: any) => number;
}

export interface ISources {
  name: string;
  query: string;
}
