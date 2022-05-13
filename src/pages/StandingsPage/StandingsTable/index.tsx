import React from 'react';
import { Table } from 'antd';
import classNames from 'classnames';

import styles from './StandingsTable.module.scss';
import { standingsTableColumns } from '../../../content/standingsContent';
import {
  IStandingsTableCbFunctions,
  IStandingsTableCreateDataSource,
} from '../../../types/standingsTypes';
import { StandingsTableProps } from '../../../types/props';

const createTableDataSource: IStandingsTableCreateDataSource = (team, idx, arr) => {
  const positionByRank = arr.length > 6 ? team.conference.rank : team.division.rank;
  const renderPosition = positionByRank > 0 ? positionByRank : idx + 1;

  return {
    key: team.teamId,
    team: (
      <>
        <span className={styles.teamRank}>{renderPosition}</span>
        <img
          className={styles.teamImage}
          src={team.logo}
          alt={team.fullName}
          width={20}
          height="auto"
          loading="lazy"
        />
        <a
          className={styles.teamFullName}
          href={`https://nba.com/${team.nickName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {team.fullName}
        </a>
        <a
          className={styles.teamShortName}
          href={`https://nba.com/${team.nickName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {team.shortName}
        </a>
      </>
    ),
    totalWin: team.totalWin,
    totalLoss: team.totalLoss,
    winPercentage: team.winPercentage,
    gamesBehind: team.gamesBehind,
    conf: `${team.conference.confWin}-${team.conference.confLoss}`,
    div: `${team.division.divisionWin}-${team.division.divisionLoss}`,
    home: `${team.homeWin}-${team.homeLoss}`,
    road: `${team.awayWin}-${team.awayLoss}`,
    last10: `${team.lastTenWin}-${10 - team.lastTenWin}`,
    streak: `${team.winStreak ? 'W' : 'L'} ${team.streak}`,
  };
};

const createTableTitle: IStandingsTableCbFunctions = (groupTeams, idx, arrayToMap) => {
  if (arrayToMap.length === 2)
    return groupTeams[0].conference.name === 'east' ? (
      <span className={styles.title}>Eastern Conference</span>
    ) : (
      <span className={styles.title}>Western Conference</span>
    );
  const divisionName = arrayToMap[idx][0].division.name;
  const formatedDivisionName = `${divisionName[0].toUpperCase()}${divisionName.slice(1)}`;

  return <span className={styles.title}>{formatedDivisionName} Division</span>;
};

const createStandingsTables: IStandingsTableCbFunctions = (
  groupTeams,
  idx,
  arrayToMap,
) => {
  const dataSource = groupTeams.map(createTableDataSource);
  const key = arrayToMap[idx][0].division.name;

  return (
    <Table
      key={key}
      className={styles.table}
      rowClassName={classNames({ [styles.row]: arrayToMap.length === 2 })}
      dataSource={dataSource}
      columns={standingsTableColumns}
      pagination={false}
      scroll={{ x: 920 }}
      title={() => createTableTitle(groupTeams, idx, arrayToMap)}
    />
  );
};

const StandingsTable = ({ filteredTeamsByGroup }: StandingsTableProps): JSX.Element => (
  <>{filteredTeamsByGroup.map(createStandingsTables)}</>
);

export default StandingsTable;
