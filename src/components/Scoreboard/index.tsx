import React from 'react';
import styles from './Scoreboard.module.scss';
import { IFetchScoreboardGames, IFetchTeamsStandings } from '../../types/apiNbaTypes';
import {
  initialCurrentDay,
  formatNextDay,
  initialNextDay,
} from '../../utils/formatDates';
import { getSeasons } from '../../utils/standings';
import { apiNba } from '../../services/apiNbaService';
import ErrorMsg from '../ErrorMsg';
import Spinner from '../Spinner';
import DatePicker from './DatePicker';
import ScoreboardGames from './ScoreboardGames';

const seasons = getSeasons(1);

const Scoreboard = (): JSX.Element => {
  const [currentDay, setCurrentDay] = React.useState(initialCurrentDay);
  const [nextDay, setNextDay] = React.useState(initialNextDay);

  const {
    data: fetchedScoreboardGames,
    error: scoreboardGamesError,
    isLoading: scoreboardGamesIsLoading,
    isFetching: scoreboardGamesIsFetching,
  } = apiNba.useFetchScoreboardGamesQuery([currentDay, nextDay]);

  const { data: fetchedTeamsStandings, isLoading: teamsStandingsIsLoading } =
    apiNba.useFetchTeamsStandingsQuery(seasons[0].toString());

  const onDateChange = React.useCallback((newDate: string) => {
    setCurrentDay(newDate);
    setNextDay(formatNextDay(newDate));
  }, []);

  if (scoreboardGamesIsLoading || teamsStandingsIsLoading)
    return <Spinner loadingData="Games schedule" />;
  if (scoreboardGamesError)
    return (
      <ErrorMsg
        error={scoreboardGamesError}
        failedData="Games Schedule"
        notAvaliableService="Api NBA"
      />
    );

  const scoreboardGames = fetchedScoreboardGames as IFetchScoreboardGames[][];
  const teamsStandings = fetchedTeamsStandings as IFetchTeamsStandings[];

  return (
    <div className={styles.inner}>
      <DatePicker onDateChange={onDateChange} />
      <div className={styles.carousel}>
        <ScoreboardGames
          gamesDates={[currentDay, nextDay]}
          scoreboardGames={scoreboardGames}
          teamsStandings={teamsStandings}
          isFetching={scoreboardGamesIsFetching}
        />
      </div>
    </div>
  );
};

export default Scoreboard;
