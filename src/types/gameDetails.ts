import { IGameSummary, ITeamAdditionalStats, ITeamBaseStats } from './apiNbaTypes';

export interface IGameSummaryProps {
  gameSummaryData: IGameSummary;
}

type TeamInfoType = {
  id: number;
  name: string;
  logo: string;
};

export interface ITeamsBaseStatsProps {
  baseStats: (TeamInfoType & ITeamBaseStats)[];
}

export interface ITeamsAdditionalStatsProps {
  additionalStats: (TeamInfoType & ITeamAdditionalStats)[];
}
