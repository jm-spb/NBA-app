import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './GameDetailsPage.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { IGameDetailsTeamStatsRender, IGameSummary } from '../../types/apiNbaTypes';
import { apiNba } from '../../services/apiNbaService';

import ErrorMsg from '../../components/ErrorMsg';
import Spinner from '../../components/Spinner';
import GameSummary from './GameSummary';
import TeamsBaseStats from './TeamsBaseStats';

const GameDetailsPage = (): JSX.Element => {
  const { gameId } = useParams();
  const { gameSummaryData, isLoading } = useAppSelector(
    (state) => state.gameSummaryReducer,
  );
  const {
    data: fetchedGameDetailsData,
    isError: gameDetailsIsError,
    isLoading: gameDetailsIsLoading,
  } = apiNba.useFetchNbaGameDetailsQuery(gameId as string);

  if (gameDetailsIsError)
    return <ErrorMsg failedData="teams statistics" notAvaliableService="apiNBA" />;

  if (isLoading || gameDetailsIsLoading) return <Spinner />;

  const gameById = gameSummaryData.find(
    (game) => game.gameId === Number(gameId),
  ) as IGameSummary;

  const { baseStats, additionalStats } =
    fetchedGameDetailsData as IGameDetailsTeamStatsRender;
  // console.log(teamsStatsTyped);

  // const  = teamsStatsTyped;
  console.log(additionalStats);

  return (
    <div className={styles.container}>
      <GameSummary gameSummaryData={gameById} />
      <div className={styles.stats}>
        <TeamsBaseStats baseStats={baseStats} />
      </div>
    </div>
  );
};

export default GameDetailsPage;
