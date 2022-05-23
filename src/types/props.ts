import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { IFetchScoreboardGames, IFetchTeamsStandings, IGameSummary } from './apiNbaTypes';
import { IGameDate } from './scoreboardTypes';
import { GroupByType } from './standingsTypes';

export type ErrorMsgProps = {
  error: FetchBaseQueryError | SerializedError | undefined;
  failedData: string;
  notAvaliableService: string;
  dataIsEmpty?: boolean;
};

export type DatePickerProps = {
  onDateChange: (date: string) => void;
};

export type ScoreboardGamesProps = {
  gamesDates: string[];
  scoreboardGames: IFetchScoreboardGames[][];
  teamsStandings: IFetchTeamsStandings[];
  isFetching: boolean;
};

export type ScoreboardSlideProps = IFetchScoreboardGames;

export type ScoreboardSwiperProps = {
  gamesDates: IGameDate[];
  gamesRenderData: IFetchScoreboardGames[][];
};

export type StandingsWidgetTableProps = {
  currentSeason: string;
};

export type GameSummaryProps = {
  gameSummaryData: IGameSummary;
};

export type StandingsPickerProps = {
  seasons: string[];
  onSeasonChange: (key: string) => void;
  onGroupChange: (key: GroupByType) => void;
};

export type StandingsTableProps = {
  filteredTeamsByGroup: IFetchTeamsStandings[][];
};

export type StatsPickersProps = {
  handleTeamChange: (value: string) => void;
  handleSeasonChange: (value: string) => void;
  handleSeasonTypeChange: (value: string) => void;
};
