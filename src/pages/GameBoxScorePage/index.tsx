import React from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './GameBoxScorePage.module.scss';
import { apiNba } from '../../services/apiNbaService';
import { IFetchNbaGameBoxScore } from '../../types/apiNbaTypes';
import { boxScoreStatsColumns } from '../../content/inGameStats';
import ErrorMsg from '../../components/ErrorMsg';
import Spinner from '../../components/Spinner';

const createDataSourceByTeam = ({
  firstname,
  lastname,
  pos,
  ...rest
}: IFetchNbaGameBoxScore) => ({
  player: (
    <>
      <span className={styles.playerName}>
        {firstname} {lastname}
      </span>
      <span className={styles.playerPos}>{pos}</span>
    </>
  ),
  ...rest,
});

const createTableByTeam = (team: IFetchNbaGameBoxScore[], idx: number) => {
  const { teamName } = team[idx];
  const dataSource = team.map(createDataSourceByTeam);
  return (
    <div className={styles.container} key={teamName}>
      <h2 className={styles.title}>{teamName}</h2>
      <Table
        className={styles.table}
        rowClassName={styles.row}
        rowKey={() => uuidv4()}
        dataSource={dataSource}
        columns={boxScoreStatsColumns}
        pagination={false}
        scroll={{ x: 1240 }}
        size="middle"
      />
    </div>
  );
};

const GameBoxScorePage = (): JSX.Element => {
  const { gameId } = useParams();
  const { data, isError, isLoading } = apiNba.useFetchGameBoxScoreQuery(gameId as string);

  if (isError)
    return <ErrorMsg failedData="players statistics" notAvaliableService="apiNBA" />;
  if (isLoading) return <Spinner />;

  const playersByTeams = data as IFetchNbaGameBoxScore[][];
  const tables = playersByTeams.map(createTableByTeam);

  return <div className={styles.boxScore}>{tables}</div>;
};

export default GameBoxScorePage;
