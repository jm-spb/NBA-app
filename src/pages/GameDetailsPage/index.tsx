import React from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './GameDetailsPage.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { IGameDetailsTeamStatsRender, IGameSummary } from '../../types/apiNbaTypes';
import { apiNba } from '../../services/apiNbaService';
import {
  teamsAdditionalStatsTableColumns,
  teamsBaseStatsTableColumns,
} from '../../content/gameDetails';
import ErrorMsg from '../../components/ErrorMsg';
import Spinner from '../../components/Spinner';
import GameSummary from './GameSummary';

const GameDetailsPage = (): JSX.Element => {
  const { gameId } = useParams();
  const { gameSummaryData, isLoading } = useAppSelector(
    (state) => state.gameSummaryReducer,
  );
  const {
    data: fetchedGameDetailsData,
    isError: gameDetailsIsError,
    isLoading: gameDetailsIsLoading,
    isFetching: gameDetailsIsFetching,
  } = apiNba.useFetchNbaGameDetailsQuery(gameId as string);

  if (gameDetailsIsError)
    return <ErrorMsg failedData="teams statistics" notAvaliableService="apiNBA" />;
  if (isLoading || gameDetailsIsLoading) return <Spinner />;

  const gameById = gameSummaryData.find(
    (game) => game.gameId === Number(gameId),
  ) as IGameSummary;

  const { baseStats, additionalStats } =
    fetchedGameDetailsData as IGameDetailsTeamStatsRender;
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
                columns={teamsBaseStatsTableColumns}
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
                columns={teamsAdditionalStatsTableColumns}
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
