import React from 'react';
import { Alert } from 'antd';

import styles from './StatsPage.module.scss';
import { apiNbaStats } from '../../services/apiNbaStats';
import { INbaStatsTeamsRender } from '../../types/apiNbaStats';
import { formatSeasons } from '../../utils/standings';
import { getAvaliableStatsSeasons } from '../../utils/stats';
import { seasonTypes } from '../../content/statsContent';
import ErrorMsg from '../../components/ErrorMsg';
import Spinner from '../../components/Spinner';
import StatsPickers from './StatsPickers';
import StatsTable from './StatsTable';

const formatedSeasons = formatSeasons(getAvaliableStatsSeasons());
const currentSeason = formatedSeasons[0];

const StatsPage = (): JSX.Element => {
  const [teamShortName, setTeamShortName] = React.useState('');
  const [selectedSeason, setSelectedSeason] = React.useState(currentSeason);
  const [seasonType, setSeasonType] = React.useState(seasonTypes[0].query);

  const handleTeamChange = React.useCallback((key: string) => {
    setTeamShortName(key);
  }, []);
  const handleSeasonChange = React.useCallback((value: string) => {
    setSelectedSeason(value);
  }, []);
  const handleSeasonTypeChange = React.useCallback((key: string) => {
    setSeasonType(key);
  }, []);

  const warningMsg = React.useMemo(
    () => (
      <Alert
        className={styles.warningMsg}
        message="Due to lack of ApiNBA Stats data for current season, all statistics are available only for previous seasons"
        type="warning"
        showIcon
        closable
      />
    ),
    [],
  );

  const infoMsg = React.useMemo(
    () => (
      <Alert
        className={styles.infoMsg}
        message="Players Stats"
        description="Please select team and season to view players statistics"
        type="info"
        showIcon
      />
    ),
    [],
  );

  const { data, isError, isLoading, isFetching } =
    apiNbaStats.useFetchNbaPlayersStatsQuery({
      teamShortName,
      selectedSeason,
      seasonType,
    });

  if (isError) return <ErrorMsg failedData="teams" notAvaliableService="Api NBA Stats" />;
  if (isLoading) return <Spinner />;

  const allTeams = data as INbaStatsTeamsRender[];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Players Stats By Team</h1>
        {warningMsg}
        <StatsPickers
          handleTeamChange={handleTeamChange}
          handleSeasonChange={handleSeasonChange}
          handleSeasonTypeChange={handleSeasonTypeChange}
        />
      </div>
      <div className={styles.tableContainer}>
        {teamShortName ? (
          <StatsTable dataSource={allTeams} isFetching={isFetching} />
        ) : (
          infoMsg
        )}
      </div>
    </div>
  );
};

export default StatsPage;
