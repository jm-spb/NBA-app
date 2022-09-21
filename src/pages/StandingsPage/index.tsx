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
import WarningMsg from '../../components/WarningMsg';

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

  if (isLoading) return <Spinner loadingData="Standings data" />;
  if (error)
    return (
      <ErrorMsg
        error={error}
        failedData="Teams Standings"
        notAvaliableService="Api NBA"
      />
    );

  const tableHeadingSeason = formatSeasons([Number(activeSeason)])[0];
  const teamsStandings = data as IFetchTeamsStandings[];
  const selectedGroup = groupBy === 'conference' ? groupConference : groupDivision;
  const filteredTeamsByGroup = filterTeamsByGroup(
    teamsStandings,
    selectedGroup,
    groupBy,
  ) as IFetchTeamsStandings[][];

  const tablesSection =
    teamsStandings.length === 0 ? (
      <WarningMsg message="Teams standings for required season are not available yet" />
    ) : (
      <section className={styles.tables}>
        {isFetching ? (
          <Spinner loadingData="Standings data" />
        ) : (
          <StandingsTable filteredTeamsByGroup={filteredTeamsByGroup} />
        )}
      </section>
    );

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
      {tablesSection}
    </div>
  );
};

export default StandingsPage;
