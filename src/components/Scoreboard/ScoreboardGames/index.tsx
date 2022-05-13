import React from 'react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/modules/navigation/navigation.scss';

import { IFetchScoreboardGames } from '../../../types/apiNbaTypes';
import { ScoreboardGamesProps } from '../../../types/props';
import {
  formatDatesInGameDateSlide,
  formatGameStartTime,
} from '../../../utils/formatDates';
import { createTeamsRecords, createWinCarets } from '../../../utils/scoreboard';
import Spinner from '../../Spinner';
import ScoreboardSwiper from '../ScoreboardSwiper';

SwiperCore.use([Navigation]);

const ScoreboardGames = ({
  gamesDates,
  scoreboardGames,
  teamsStandings,
  isFetching,
}: ScoreboardGamesProps): JSX.Element => {
  if (isFetching) return <Spinner />;

  const formatedGamesDates = formatDatesInGameDateSlide(gamesDates);

  // Create proper data for slides in scoreboard
  const gamesRenderData: IFetchScoreboardGames[][] = scoreboardGames.map((gameDate) =>
    gameDate.map(({ gameId, startTime, statusGame, teamsInfo }) => {
      const startTimeLocal = formatGameStartTime(startTime);

      // create caret icon (arrow) when either team wins
      const [homeWinCaret, visitorWinCaret] = createWinCarets(
        statusGame,
        teamsInfo.homeTeamInfo.points,
        teamsInfo.visitorTeamInfo.points,
      );

      // find home and visitor teams record (win-loss) from teamsStandings data
      const [homeTeamRecord, visitorTeamRecord] = createTeamsRecords(
        teamsStandings,
        teamsInfo,
      );

      return {
        gameId,
        startTime: startTimeLocal,
        statusGame,
        teamsInfo: {
          homeTeamInfo: {
            ...teamsInfo.homeTeamInfo,
            ...homeTeamRecord,
            winCaret: homeWinCaret,
          },
          visitorTeamInfo: {
            ...teamsInfo.visitorTeamInfo,
            ...visitorTeamRecord,
            winCaret: visitorWinCaret,
          },
        },
      };
    }),
  );

  return (
    <ScoreboardSwiper gamesDates={formatedGamesDates} gamesRenderData={gamesRenderData} />
  );
};

export default ScoreboardGames;
