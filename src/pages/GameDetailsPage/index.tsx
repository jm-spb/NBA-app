import React from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './GameDetailsPage.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { IFetchGameDetailsTeamStats, IGameSummary } from '../../types/apiNbaTypes';
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
  const { gameSummaryData, isLoading } = useAppSelector(
    (state) => state.gameSummaryReducer,
  );
  const {
    data: fetchedGameDetailsData,
    error: gameDetailsError,
    isLoading: gameDetailsIsLoading,
    isFetching: gameDetailsIsFetching,
  } = apiNba.useFetchGameDetailsQuery(gameIdTyped);

  // Find game only when gameId query in url is changed, otherwise do nothing => show previous game
  const getGameById = React.useMemo(
    () => gameSummaryData.find((game) => game.gameId === Number(gameIdTyped)),
    [gameIdTyped],
  );

  if (gameDetailsError && 'message' in gameDetailsError)
    return (
      <ErrorMsg
        failedData="Teams Statistics"
        notAvaliableService="apiNBA"
        details={gameDetailsError.message as string}
      />
    );
  if (!getGameById)
    return (
      <ErrorMsg
        failedData="Teams Statistics"
        notAvaliableService="apiNBA"
        details="Game you are looking for is not exist. Please provide a valid game id"
      />
    );
  if (isLoading || gameDetailsIsLoading) return <Spinner />;

  const gameById = getGameById as IGameSummary;
  const { baseStats, additionalStats } =
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
      <GameSummary gameSummaryData={gameById} />
      <section className={styles.statsWrapper}>
        {gameDetailsIsFetching ? (
          <Spinner />
        ) : (
          <>
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
          </>
        )}
      </section>
    </div>
  );
};

export default GameDetailsPage;
