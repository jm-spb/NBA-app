import { ITeamAdditionalStats, ITeamBaseStats } from './apiNbaTypes';

interface TeamInfoType {
  id: number;
  name: string;
  logo: string;
}

export interface ITeamsBaseStatsProps {
  baseStats: (TeamInfoType & ITeamBaseStats)[];
}

export interface ITeamsAdditionalStatsProps {
  additionalStats: (TeamInfoType & ITeamAdditionalStats)[];
}
