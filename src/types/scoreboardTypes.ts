import { IScoreboardGamesRender, ITeamsInfo, ITeamsStandingsRender } from './apiNbaTypes';

export interface IDatePickerProps {
  onDateChange: (date: string) => void;
}

export interface IScoreboardGamesProps {
  gamesDates: string[];
  scoreboardGames: IScoreboardGamesRender[][];
  teamsStandings: ITeamsStandingsRender[];
  isFetching: boolean;
}

export interface IScoreboardSwiperProps {
  gamesDates: GameDateType[];
  gamesRenderData: IScoreboardGamesRender[][];
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
    teamsStandingsArr: ITeamsStandingsRender[],
    teamsInfoObject: ITeamsInfo,
  ): ITeamsStandingsRender[];
}
