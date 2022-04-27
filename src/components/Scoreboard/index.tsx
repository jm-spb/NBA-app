import React from 'react';

import styles from './Scoreboard.module.scss';
import { IScoreboardGamesRender, ITeamsStandingsRender } from '../../types/apiNbaTypes';
import { currentDay, formatNextDay, nextDay } from '../../utils/formatDates';
import { getSeasons } from '../../utils/standings';
import { apiNba } from '../../services/apiNbaService';
import ErrorMsg from '../ErrorMsg';
import Spinner from '../Spinner';
import DatePicker from './DatePicker';
import ScoreboardGames from './ScoreboardGames';
import { gameSummarySlice } from '../../store/reducers/gameSummarySlice';
import { useAppDispatch } from '../../hooks/redux';

const seasons = getSeasons(5);

const Scoreboard = (): JSX.Element => {
  const [gamesDates, setGamesDates] = React.useState([currentDay, nextDay]);
  const { getSummary } = gameSummarySlice.actions;
  const dispatch = useAppDispatch();

  const {
    data: fetchedScoreboardGames,
    isError: scoreboardGamesIsError,
    isLoading: scoreboardGamesIsLoading,
    isFetching: scoreboardGamesIsFetching,
  } = apiNba.useFetchScoreboardGamesQuery(gamesDates);

  React.useEffect(() => {
    if (fetchedScoreboardGames) {
      dispatch(getSummary(fetchedScoreboardGames));
    }
  }, [fetchedScoreboardGames, dispatch, getSummary]);

  const { data: fetchedTeamsStandings, isLoading: teamsStandingsIsLoading } =
    apiNba.useFetchTeamsStandingsQuery(seasons[0].toString());

  const onDateChange = React.useCallback((date: string) => {
    setGamesDates([date, formatNextDay(date)]);
  }, []);

  if (scoreboardGamesIsError)
    return <ErrorMsg failedData="games" notAvaliableService="Api NBA" />;

  if (scoreboardGamesIsLoading || teamsStandingsIsLoading) return <Spinner />;

  const scoreboardGames = fetchedScoreboardGames as IScoreboardGamesRender[][];
  const teamsStandings = fetchedTeamsStandings as ITeamsStandingsRender[];

  return (
    <div className={styles.inner}>
      <DatePicker onDateChange={onDateChange} />
      <div className={styles.carousel}>
        <ScoreboardGames
          gamesDates={gamesDates}
          scoreboardGames={scoreboardGames}
          teamsStandings={teamsStandings}
          isFetching={scoreboardGamesIsFetching}
        />
      </div>
    </div>
  );
};

export default Scoreboard;
