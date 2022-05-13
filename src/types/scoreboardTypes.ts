import { ITeamsInfo, IFetchTeamsStandings } from './apiNbaTypes';

export interface IGameDate {
  weekDay: string;
  monthDay: string;
}

export interface ICreateScoreboardSlides {
  (
    gamesDatesSlides: JSX.Element[],
    gamesRenderSlides: JSX.Element[] | JSX.Element[][],
  ): JSX.Element[];
}

export interface ICreateWinCarets {
  (statusGame: string, homeTeamPoints: number, visitTeamPoints: number): string[];
}

export interface ICreateTeamsRecords {
  (
    teamsStandingsArr: IFetchTeamsStandings[],
    teamsInfoObject: ITeamsInfo,
  ): IFetchTeamsStandings[];
}
