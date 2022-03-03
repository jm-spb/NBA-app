import React from 'react';
import SwiperCore, { Navigation } from 'swiper';

import './Scoreboard.scss';
import 'swiper/modules/navigation/navigation.scss';

import Spinner from '../Spinner';
import DatePicker from '../DatePicker';
import ScoreboardGames from './ScoreboardGames';

import {
  currentDay,
  nextDay,
  formatNextDay,
  formatDatesInGameDateSlide,
  formatGameStartTime,
} from '../../utils/formatDates';
import { apiNba } from '../../services/apiNbaService';

import ErrorMsg from '../ErrorMsg';
import { IScoreboardGamesRender, ITeamsStandingsRender } from '../../types/apiNbaTypes';

import { createWinCarets } from '../../utils/scoreboard';

SwiperCore.use([Navigation]);

const Scoreboard = (): JSX.Element => {
  const [gamesDates, setGamesDates] = React.useState([currentDay, nextDay]);
  const {
    data: fetchedScoreboardGames,
    isLoading: scoreboardGamesIsLoading,
    isFetching: scoreboardGamesIsFetching,
    isError: scoreboardGamesIsError,
  } = apiNba.useFetchScoreboardGamesQuery(gamesDates);

  const { data: fetchedTeamsStandings, isLoading: teamsStandingsIsLoading } =
    apiNba.useFetchTeamsStandingsQuery('');

  if (scoreboardGamesIsLoading || teamsStandingsIsLoading)
    return (
      <div className="scoreboard">
        <Spinner />
      </div>
    );

  if (scoreboardGamesIsError) return <ErrorMsg notAvaliableService="Api NBA" />;

  // Handle Date change in Date Picker
  const onChange = (date: Date | null, dateString: string) => {
    if (date) setGamesDates([dateString, formatNextDay(dateString)]);
  };

  const formatedGamesDates = formatDatesInGameDateSlide(gamesDates);

  const scoreboardGames = fetchedScoreboardGames as IScoreboardGamesRender[][];
  const teamsStandings = fetchedTeamsStandings as ITeamsStandingsRender[];

  const gamesRenderData: IScoreboardGamesRender[][] = scoreboardGames.map((gameDate) =>
    gameDate.map(({ gameId, startTime, statusGame, teamsInfo }) => {
      const startTimeLocal = formatGameStartTime(startTime);
      const [homeWinCaret, visitorWinCaret] = createWinCarets(
        statusGame,
        teamsInfo.homeTeamInfo.points,
        teamsInfo.visitorTeamInfo.points,
      );

      const homeTeamRecord = teamsStandings.find(
        ({ fullName }) => teamsInfo.homeTeamInfo.fullName === fullName,
      );

      const visitorTeamRecord = teamsStandings.find(
        ({ fullName }) => teamsInfo.visitorTeamInfo.fullName === fullName,
      );

      return {
        gameId,
        startTime: startTimeLocal,
        statusGame,
        teamsInfo: {
          homeTeamInfo: {
            teamId: teamsInfo.homeTeamInfo.teamId,
            fullName: teamsInfo.homeTeamInfo.fullName,
            shortName: teamsInfo.homeTeamInfo.shortName,
            logo: teamsInfo.homeTeamInfo.logo,
            points: teamsInfo.homeTeamInfo.points,
            win: homeTeamRecord?.win,
            loss: homeTeamRecord?.loss,
            winCaret: homeWinCaret,
          },
          visitorTeamInfo: {
            teamId: teamsInfo.visitorTeamInfo.teamId,
            fullName: teamsInfo.visitorTeamInfo.fullName,
            shortName: teamsInfo.visitorTeamInfo.shortName,
            logo: teamsInfo.visitorTeamInfo.logo,
            points: teamsInfo.visitorTeamInfo.points,
            win: visitorTeamRecord?.win,
            loss: visitorTeamRecord?.loss,
            winCaret: visitorWinCaret,
          },
        },
      };
    }),
  );

  console.log(gamesRenderData);

  return (
    <div className="scoreboard">
      <div className="scoreboard-inner">
        <div className="scoreboard-datePicker">
          <span>Game Date</span>
          <DatePicker onChange={onChange} />
        </div>
        {/* Show Spinner on date change */}
        {scoreboardGamesIsFetching ? (
          <Spinner />
        ) : (
          <div className="carousel">
            <ScoreboardGames
              gamesDates={formatedGamesDates}
              gamesRenderData={gamesRenderData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
