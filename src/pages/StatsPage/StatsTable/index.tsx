import React from 'react';
import { Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './StatsTable.module.scss';
import { apiNbaStats } from '../../../services/apiNbaStats';
import { statsTableColumns } from '../../../content/statsContent';
import { IStatsTableDataSource, IStatsTableProps } from '../../../types/stats';
import { INbaPlayersNamesRender } from '../../../types/apiNbaStats';
import { createTableDataSource } from '../../../utils/stats';
import ErrorMsg from '../../../components/ErrorMsg';
import Spinner from '../../../components/Spinner';

const StatsTable = ({
  teamId,
  selectedSeason,
  seasonType,
}: IStatsTableProps): JSX.Element => {
  const {
    data: fetchedPlayersStats,
    isError: playersStatsIsError,
    isLoading: playersStatsIsLoading,
    isFetching: playersStatsIsFetching,
  } = apiNbaStats.useFetchNbaPlayersStatsQuery({
    teamId,
    selectedSeason,
    seasonType,
  });

  const ids = fetchedPlayersStats?.map(({ player_id }) => player_id as number);

  const {
    data: fetchedPlayersNames,
    isError: playersNamesIsError,
    isLoading: playersNamesIsLoading,
    isFetching: playersNamesIsFetching,
  } = apiNbaStats.useFetchNbaPlayersNamesQuery(ids);

  if (playersStatsIsError || playersNamesIsError)
    return <ErrorMsg failedData="teams" notAvaliableService="Api NBA Stats" />;
  if (playersStatsIsLoading || playersNamesIsLoading) return <Spinner />;

  const fetchedPlayersStatsData = fetchedPlayersStats as IStatsTableDataSource[];
  const fetchedPlayersNamesData = fetchedPlayersNames as INbaPlayersNamesRender[];

  const dataSource = createTableDataSource(
    fetchedPlayersStatsData,
    fetchedPlayersNamesData,
  );

  return (
    <Table
      className={styles.table}
      rowClassName={styles.row}
      rowKey={() => uuidv4()}
      dataSource={dataSource}
      columns={statsTableColumns}
      pagination={false}
      scroll={{ x: 1400 }}
      loading={playersStatsIsFetching || playersNamesIsFetching}
    />
  );
};

export default StatsTable;
