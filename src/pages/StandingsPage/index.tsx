import React from 'react';

import styles from './StandingsPage.module.scss';
import { ITeamsStandingsRender } from '../../types/apiNbaTypes';
import { apiNba } from '../../services/apiNbaService';
import { formatSeasons, getSeasons } from '../../utils/standings';
import ErrorMsg from '../../components/ErrorMsg';
import Spinner from '../../components/Spinner';
import StandingsPicker from './StandingsPicker';
import StandingsTable from './StandingsTable';

const seasons = getSeasons();

const StandingsPage = (): JSX.Element => {
  const [activeSeason, setActiveSeason] = React.useState(seasons[0].toString());
  const [groupBy, setGroupBy] = React.useState<'conference' | 'division'>('conference');
  const { data, isError, isLoading, isFetching } =
    apiNba.useFetchTeamsStandingsQuery(activeSeason);

  const onSeasonChange = React.useCallback((key: string) => {
    setActiveSeason(key);
  }, []);
  const onGroupChange = React.useCallback((key: 'conference' | 'division') => {
    setGroupBy(key);
  }, []);
  const formatedSeasons = React.useMemo(() => formatSeasons(seasons), []);
  const tableHeadingSeason = formatSeasons([Number(activeSeason)])[0];

  if (isError)
    return <ErrorMsg failedData="teams standings" notAvaliableService="Api NBA" />;

  if (isLoading) {
    return (
      <div className={styles.standings}>
        <Spinner />
      </div>
    );
  }

  const teamsStandings = data as ITeamsStandingsRender[];

  return (
    <div className={styles.standings}>
      <div className={styles.header}>
        <h1
          className={styles.heading}
        >{`NBA ${tableHeadingSeason} Regular Season Standings`}</h1>
      </div>
      <StandingsPicker
        seasons={formatedSeasons}
        onSeasonChange={onSeasonChange}
        onGroupChange={onGroupChange}
      />
      <StandingsTable
        teamsStandings={teamsStandings}
        isFetching={isFetching}
        groupBy={groupBy}
      />
    </div>
  );
};

export default StandingsPage;
