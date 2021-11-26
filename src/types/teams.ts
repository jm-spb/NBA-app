export interface ITeamsFullData {
  api: Api;
}

export interface ITeamsRenderData {
  fullName: string;
  teamId: string;
  logo: string;
  divName?: string;
}

export interface ITeamsResponseData extends ITeamsRenderData {
  leagues: Leagues;
}

type Api = {
  status: string;
  message: string;
  results: string;
  filters: Array<string>;
  teams: ITeamsRenderData[];
};

type Leagues = {
  standard: Standard;
};

type Standard = {
  confName: string;
  divName: string;
};
