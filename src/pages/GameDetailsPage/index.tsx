import React from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './GameDetailsPage.module.scss';
import { IFetchGameDetailsTeamStats } from '../../types/apiNbaTypes';
import { apiNba } from '../../services/apiNbaService';
import {
  gameDetailsAdditionalStatsColumns,
  gameDetailsBaseStatsColumns,
} from '../../content/inGameStats';
import ErrorMsg from '../../components/ErrorMsg';
import Spinner from '../../components/Spinner';
import GameSummary from './GameSummary';

const GameDetailsPage = (): JSX.Element => {
  const { gameId } = useParams();
  const gameIdTyped = gameId as string;
  const {
    data: fetchedGameDetailsData,
    error: gameDetailsError,
    isLoading: gameDetailsIsLoading,
    isFetching: gameDetailsIsFetching,
  } = apiNba.useFetchGameDetailsQuery(gameIdTyped);

  if (gameDetailsIsLoading || gameDetailsIsFetching)
    return <Spinner loadingData="Game Stats data" />;

  const dataIsEmpty = fetchedGameDetailsData?.baseStats.length === 0;

  if (gameDetailsError || dataIsEmpty)
    return (
      <ErrorMsg
        error={gameDetailsError}
        failedData="Teams Statistics"
        notAvaliableService="Api NBA"
        dataIsEmpty={dataIsEmpty}
      />
    );

  const { gameSummary, baseStats, additionalStats } =
    fetchedGameDetailsData as IFetchGameDetailsTeamStats;

  const baseStatsDataSource = baseStats.map(({ name, ...rest }) => ({
    name: <span className={styles.teamName}>{name}</span>,
    ...rest,
  }));
  const additionalStatsDataSource = additionalStats.map(({ name, ...rest }) => ({
    name: <span className={styles.teamName}>{name}</span>,
    ...rest,
  }));

  return (
    <div className={styles.container}>
      <GameSummary gameSummaryData={gameSummary} />
      <section className={styles.statsWrapper}>
        <div className={styles.stats}>
          <h2 className={styles.title}>Base Teams Stats</h2>
          <Table
            className={styles.table}
            rowClassName={styles.row}
            rowKey={() => uuidv4()}
            dataSource={baseStatsDataSource}
            columns={gameDetailsBaseStatsColumns}
            pagination={false}
            scroll={{ x: 1200 }}
            size="small"
          />
        </div>
        <div className={styles.stats}>
          <h2 className={styles.title}>Additional Teams Stats</h2>
          <Table
            className={styles.table}
            rowClassName={styles.row}
            rowKey={() => uuidv4()}
            dataSource={additionalStatsDataSource}
            columns={gameDetailsAdditionalStatsColumns}
            pagination={false}
            scroll={{ x: 580 }}
            size="small"
          />
        </div>
      </section>
    </div>
  );
};

export default GameDetailsPage;
