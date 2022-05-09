import React from 'react';
import { Descriptions, Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import styles from './GameSummary.module.scss';
import { gameSummaryTableColumns } from '../../../content/inGameStats';
import { IGameSummaryProps } from '../../../types/gameDetails';

const GameSummary = ({ gameSummaryData }: IGameSummaryProps): JSX.Element => {
  const { arena, date, officials, scores } = gameSummaryData;
  const dataSource = scores.map(({ team, linescore, final }, teamIdx) => {
    // todo: refactor changing color by quarter
    const [q1, q2, q3, q4] = linescore.map((quarter, quarterIdx) => (
      <span
        style={{
          color: classNames({
            'rgb(200,16,46)':
              teamIdx === 0 && Number(quarter) > Number(scores[1].linescore[quarterIdx]),
            'rgb(200,16,45)':
              teamIdx === 1 && Number(quarter) > Number(scores[0].linescore[quarterIdx]),
          }),
        }}
      >
        {quarter}
      </span>
    ));
    return {
      team: <span className={styles.teamName}>{team}</span>,
      q1,
      q2,
      q3,
      q4,
      final: (
        <span
          style={{
            color: classNames({
              'rgb(200,16,46)': teamIdx === 0 && Number(final) > Number(scores[1].final),
              'rgb(200,16,45)': teamIdx === 1 && Number(final) > Number(scores[0].final),
            }),
          }}
        >
          {final}
        </span>
      ),
    };
  });

  return (
    <div className={styles.flex}>
      <div className={styles.scores}>
        <h2 className={styles.title}>{date}</h2>
        <Table
          rowKey={() => uuidv4()}
          className={styles.table}
          dataSource={dataSource}
          columns={gameSummaryTableColumns}
          size="small"
          pagination={false}
        />
      </div>
      <Descriptions
        className={styles.info}
        title={<p className={styles.title}>Game Info</p>}
        contentStyle={{ display: 'flex', flexDirection: 'column' }}
        column={1}
      >
        <Descriptions.Item className={styles.item} label="Location">
          <span>{arena.name}</span>
          <span>{arena.city}</span>
          <span>{arena.state}</span>
        </Descriptions.Item>
        <Descriptions.Item className={styles.item} label="Officials">
          {officials.join(', ')}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default GameSummary;
