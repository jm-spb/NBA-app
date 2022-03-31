import React from 'react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/modules/navigation/navigation.scss';

import styles from './Scoreboard.module.scss';
import {
  currentDay,
  nextDay,
  formatNextDay,
  formatDatesInGameDateSlide,
  formatGameStartTime,
} from '../../utils/formatDates';
import { apiNba } from '../../services/apiNbaService';
import { IScoreboardGamesRender, ITeamsStandingsRender } from '../../types/apiNbaTypes';
import { createTeamsRecords, createWinCarets } from '../../utils/scoreboard';
import Spinner from '../Spinner';
import DatePicker from '../DatePicker';
import ScoreboardSwiper from './ScoreboardSwiper';
import ErrorMsg from '../ErrorMsg';

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

  // Handle Date change in Date Picker
  const onChange = (date: Date | null, dateString: string) => {
    if (date) setGamesDates([dateString, formatNextDay(dateString)]);
  };

  // Because we use the same API for games and standings, we can only check scoreboardGamesIsError
  if (scoreboardGamesIsError) return <ErrorMsg notAvaliableService="Api NBA" />;

  // Show Spinner on entire scoreboard bar on initial loading
  if (scoreboardGamesIsLoading || teamsStandingsIsLoading) {
    return (
      <div className={styles.scoreboard}>
        <Spinner />
      </div>
    );
  }

  // Show Spinner with Date Picker when change data
  if (scoreboardGamesIsFetching) {
    return (
      <div className={styles.scoreboard}>
        <div className={styles.inner}>
          <div className={styles.datePicker}>
            <span className={styles.date}>Game Date</span>
            <DatePicker onChange={onChange} />
          </div>
          <Spinner />
        </div>
      </div>
    );
  }

  const formatedGamesDates = formatDatesInGameDateSlide(gamesDates);

  const scoreboardGames = fetchedScoreboardGames as IScoreboardGamesRender[][];
  const teamsStandings = fetchedTeamsStandings as ITeamsStandingsRender[];

  // Create proper data for slides in scoreboard
  const gamesRenderData: IScoreboardGamesRender[][] = scoreboardGames.map((gameDate) =>
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

  console.log(gamesRenderData);

  return (
    <div className={styles.scoreboard}>
      <div className={styles.inner}>
        <div className={styles.datePicker}>
          <span className={styles.date}>Game Date</span>
          <DatePicker onChange={onChange} />
        </div>
        <div className={styles.carousel}>
          <ScoreboardSwiper
            gamesDates={formatedGamesDates}
            gamesRenderData={gamesRenderData}
          />
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
