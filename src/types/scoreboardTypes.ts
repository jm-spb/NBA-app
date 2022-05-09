import { IFetchScoreboardGames, ITeamsInfo, IFetchTeamsStandings } from './apiNbaTypes';

export interface IDatePickerProps {
  onDateChange: (date: string) => void;
}

export interface IScoreboardGamesProps {
  gamesDates: string[];
  scoreboardGames: IFetchScoreboardGames[][];
  teamsStandings: IFetchTeamsStandings[];
  isFetching: boolean;
}

export interface IScoreboardSwiperProps {
  gamesDates: GameDateType[];
  gamesRenderData: IFetchScoreboardGames[][];
}

export type GameDateType = {
  weekDay: string;
  monthDay: string;
};

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
