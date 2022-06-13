import React from 'react';
import { useParams } from 'react-router-dom';
import { Table, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import styles from './GameBoxScorePage.module.scss';
import { apiNba } from '../../services/apiNbaService';
import { IBoxScoreTableTotals, IFetchNbaGameBoxScore } from '../../types/apiNbaTypes';
import {
  ICreateDataSourceByTeam,
  ICreateSummaryRow,
  ICreateTableByTeam,
  ITotalsDataReducer,
} from '../../types/gameBoxScorePage';
import { boxScoreStatsColumns } from '../../content/inGameStats';
import ErrorMsg from '../../components/ErrorMsg';
import Spinner from '../../components/Spinner';

const { Text } = Typography;

const createDataSourceByTeam: ICreateDataSourceByTeam = ({
  firstname,
  lastname,
  pos,
  fgm,
  tpm,
  totReb,
  assists,
  steals,
  blocks,
  points,
  ...rest
}) => ({
  player: (
    <>
      <span className={styles.playerName}>
        {firstname} {lastname}
      </span>
      <span className={styles.playerPos}>{pos}</span>
    </>
  ),
  fgm: <span className={styles.important}>{fgm}</span>,
  tpm: <span className={styles.important}>{tpm}</span>,
  totReb: <span className={styles.important}>{totReb}</span>,
  assists: <span className={styles.important}>{assists}</span>,
  steals: <span className={styles.important}>{steals}</span>,
  blocks: <span className={styles.important}>{blocks}</span>,
  points: <span className={styles.important}>{points}</span>,
  ...rest,
});

const totalsDataReducer: ITotalsDataReducer = (totals, player) => {
  if (
    typeof player.points !== 'number' &&
    typeof player.fgm !== 'number' &&
    typeof player.tpm !== 'number' &&
    typeof player.totReb !== 'number' &&
    typeof player.assists !== 'number' &&
    typeof player.steals !== 'number' &&
    typeof player.blocks !== 'number'
  ) {
    return {
      fgm: totals.fgm + player.fgm.props.children,
      fga: totals.fga + player.fga,
      fgp: '',
      tpm: totals.tpm + player.tpm.props.children,
      tpa: totals.tpa + player.tpa,
      tpp: '',
      ftm: totals.ftm + player.ftm,
      fta: totals.fta + player.fta,
      ftp: '',
      offReb: totals.offReb + player.offReb,
      defReb: totals.defReb + player.defReb,
      totReb: totals.totReb + player.totReb.props.children,
      assists: totals.assists + player.assists.props.children,
      steals: totals.steals + player.steals.props.children,
      blocks: totals.blocks + player.blocks.props.children,
      turnovers: totals.turnovers + player.turnovers,
      pFouls: totals.pFouls + player.pFouls,
      points: totals.points + player.points.props.children,
    };
  }

  return totals;
};

const createSummaryRow: ICreateSummaryRow = (tableData) => {
  const totalsData = tableData.reduce(totalsDataReducer, {
    fgm: 0,
    fga: 0,
    fgp: '',
    tpm: 0,
    tpa: 0,
    tpp: '',
    ftm: 0,
    fta: 0,
    ftp: '',
    offReb: 0,
    defReb: 0,
    totReb: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    turnovers: 0,
    pFouls: 0,
    points: 0,
  });

  totalsData.fgp = (((totalsData.fgm as number) / totalsData.fga) * 100).toFixed(1);
  totalsData.ftp = (((totalsData.ftm as number) / totalsData.fta) * 100).toFixed(1);
  totalsData.tpp = (((totalsData.tpm as number) / totalsData.tpa) * 100).toFixed(1);

  const keys = Object.keys(totalsData) as Array<keyof IBoxScoreTableTotals>;
  const totalsRow = keys.map((stat, idx) => {
    const colSpan = idx === 0 ? 2 : 1;
    const align = idx === 0 ? 'right' : 'center';

    return (
      <Table.Summary.Cell key={stat} index={idx + 1} colSpan={colSpan} align={align}>
        <Text
          className={classnames({
            [styles.important]:
              idx === 0 ||
              idx === 3 ||
              idx === 11 ||
              idx === 12 ||
              idx === 13 ||
              idx === 14 ||
              idx === 17,
          })}
          strong
        >
          {totalsData[stat]}
        </Text>
      </Table.Summary.Cell>
    );
  });

  return (
    <Table.Summary fixed>
      <Table.Summary.Row>
        <Table.Summary.Cell index={0} colSpan={1} className={styles.totals}>
          <Text strong>TOTALS</Text>
        </Table.Summary.Cell>
        {totalsRow}
      </Table.Summary.Row>
    </Table.Summary>
  );
};

const createTableByTeam: ICreateTableByTeam = (team, idx) => {
  const { teamName } = team[idx];
  const dataSource = team.map(createDataSourceByTeam);
  return (
    <div className={styles.container} key={teamName}>
      <h1 className={styles.title}>{teamName}</h1>
      <Table
        className={styles.table}
        rowClassName={styles.row}
        rowKey={() => uuidv4()}
        dataSource={dataSource}
        columns={boxScoreStatsColumns}
        pagination={false}
        scroll={{ x: 1240 }}
        size="middle"
        summary={createSummaryRow}
      />
    </div>
  );
};

const GameBoxScorePage = (): JSX.Element => {
  const { gameId } = useParams();
  const gameIdTyped = gameId as string;
  const { data, error, isLoading } = apiNba.useFetchGameBoxScoreQuery(gameIdTyped);

  if (isLoading) return <Spinner loadingData="Game Box Score" />;

  const dataIsEmpty = data?.length === 0;
  if (error || dataIsEmpty)
    return (
      <ErrorMsg
        error={error}
        failedData="Teams Statistics"
        notAvaliableService="Api NBA"
        dataIsEmpty={dataIsEmpty}
      />
    );

  const playersByTeams = data as IFetchNbaGameBoxScore[][];
  const tables = playersByTeams.map(createTableByTeam);

  return <div className={styles.boxScore}>{tables}</div>;
};

export default GameBoxScorePage;
