import React from 'react';

import styles from './StandingsPage.module.scss';
import { IFetchTeamsStandings } from '../../types/apiNbaTypes';
import { apiNba } from '../../services/apiNbaService';
import { filterTeamsByGroup, formatSeasons, getSeasons } from '../../utils/standings';
import { groupConference, groupDivision } from '../../content/standingsContent';
import ErrorMsg from '../../components/ErrorMsg';
import Spinner from '../../components/Spinner';
import StandingsPicker from './StandingsPicker';
import StandingsTable from './StandingsTable';
import { GroupByType } from '../../types/standingsTypes';

const seasons = getSeasons(5);

const StandingsPage = (): JSX.Element => {
  const [activeSeason, setActiveSeason] = React.useState(seasons[0].toString());
  const [groupBy, setGroupBy] = React.useState<GroupByType>('conference');
  const { data, error, isLoading, isFetching } =
    apiNba.useFetchTeamsStandingsQuery(activeSeason);

  const onSeasonChange = React.useCallback((key: string) => {
    setActiveSeason(key);
  }, []);
  const onGroupChange = React.useCallback((key: GroupByType) => {
    setGroupBy(key);
  }, []);
  const formatedSeasons = React.useMemo(() => formatSeasons(seasons), []);
  const tableHeadingSeason = formatSeasons([Number(activeSeason)])[0];

  if (isLoading) return <Spinner loadingData="Standings data" />;
  if (error) {
    if ('error' in error) {
      return (
        <ErrorMsg
          failedData="Teams Standings"
          notAvaliableService="Api NBA"
          details={error.error}
        />
      );
    }
    if ('data' in error) {
      const { message } = error.data as { message: string };
      return (
        <ErrorMsg
          failedData="Teams Standings"
          notAvaliableService="Api NBA"
          details={message}
        />
      );
    }
    if ('message' in error) {
      return (
        <ErrorMsg
          failedData="Teams Standings"
          notAvaliableService="Api NBA"
          details={error.message as string}
        />
      );
    }
  }

  const teamsStandings = data as IFetchTeamsStandings[];
  const selectedGroup = groupBy === 'conference' ? groupConference : groupDivision;
  const filteredTeamsByGroup = filterTeamsByGroup(
    teamsStandings,
    selectedGroup,
    groupBy,
  ) as IFetchTeamsStandings[][];

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
      <section className={styles.tables}>
        {isFetching ? (
          <Spinner loadingData="Standings data" />
        ) : (
          <StandingsTable filteredTeamsByGroup={filteredTeamsByGroup} />
        )}
      </section>
    </div>
  );
};

export default StandingsPage;
