import React from 'react';
import { Alert, Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import styles from './StatsPage.module.scss';
import { apiNbaStats } from '../../services/apiNbaStats';
import { formatSeasons } from '../../utils/standings';
import { getAvaliableStatsSeasons } from '../../utils/stats';
import { seasonTypes, statsTableColumns } from '../../content/statsContent';
import { IPlayersStatsTableDataSource } from '../../types/stats';
import ErrorMsg from '../../components/ErrorMsg';
import Spinner from '../../components/Spinner';
import StatsPickers from './StatsPickers';

const formatedSeasons = formatSeasons(getAvaliableStatsSeasons());
const currentSeason = formatedSeasons[0];

const warningMsg = (
  <Alert
    className={styles.warningMsg}
    message="Due to lack of ApiNBA Stats data for current season, all statistics are available only for previous seasons"
    type="warning"
    showIcon
    closable
  />
);

const infoMsg = (
  <Alert
    className={styles.infoMsg}
    message="Players Stats"
    description="Please select team and season to view players statistics"
    type="info"
    showIcon
  />
);

const StatsPage = (): JSX.Element => {
  const [teamShortName, setTeamShortName] = React.useState('');
  const [selectedSeason, setSelectedSeason] = React.useState(currentSeason);
  const [seasonType, setSeasonType] = React.useState(seasonTypes[0].query);

  const handleTeamChange = React.useCallback((value: string) => {
    setTeamShortName(value);
  }, []);
  const handleSeasonChange = React.useCallback((value: string) => {
    setSelectedSeason(value);
  }, []);
  const handleSeasonTypeChange = React.useCallback((value: string) => {
    setSeasonType(value);
  }, []);

  const { data, error, isLoading, isFetching } = apiNbaStats.useFetchPlayersStatsQuery({
    teamShortName,
    selectedSeason,
    seasonType,
  });

  if (isLoading) return <Spinner loadingData="Stats table" />;
  if (error)
    return (
      <ErrorMsg
        error={error}
        failedData="Teams Stats"
        notAvaliableService="Api NBA Stats"
      />
    );

  const playersByTeam = data as IPlayersStatsTableDataSource[] | null;
  let tableDataSource;

  if (playersByTeam) {
    tableDataSource = playersByTeam.map(({ full_name, ...rest }) => ({
      full_name: <span className={styles.playerName}>{full_name}</span>,
      ...rest,
    }));
  }

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
          <Table
            className={styles.table}
            rowClassName={styles.row}
            rowKey={() => uuidv4()}
            dataSource={tableDataSource}
            columns={statsTableColumns}
            pagination={false}
            scroll={{ x: 1400 }}
            loading={{
              spinning: isFetching,
              tip: <span>Loading may take some time. Please wait...</span>,
            }}
          />
        ) : (
          infoMsg
        )}
      </div>
    </div>
  );
};

export default StatsPage;
