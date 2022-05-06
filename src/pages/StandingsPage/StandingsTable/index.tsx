import React from 'react';
import { Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import styles from './StandingsTable.module.scss';
import {
  groupConference,
  groupDivision,
  standingsTableColumns,
} from '../../../content/standingsContent';
import { filterTeamsByGroup } from '../../../utils/standings';
import { IStandingsTableProps } from '../../../types/standingsTypes';
import { ITeamsStandingsRender } from '../../../types/apiNbaTypes';

const createTableDataSource = (
  team: ITeamsStandingsRender,
  idx: number,
  arr: ITeamsStandingsRender[],
) => {
  const positionByRank = arr.length > 6 ? team.conference.rank : team.division.rank;
  const renderPosition = positionByRank > 0 ? positionByRank : idx + 1;

  return {
    key: team.teamId,
    team: (
      <div>
        <span className={styles.teamRank}>{renderPosition}</span>
        <img
          className={styles.teamImage}
          src={team.logo}
          alt={team.fullName}
          width={20}
          height="auto"
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
      </div>
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

const createTableTitle = (
  groupTeams: ITeamsStandingsRender[],
  idx: number,
  arrayToMap: ITeamsStandingsRender[][],
) => {
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

const createStandingsTables = (
  groupTeams: ITeamsStandingsRender[],
  idx: number,
  arrayToMap: ITeamsStandingsRender[][],
) => {
  const dataSource = groupTeams.map(createTableDataSource);

  return (
    <Table
      key={uuidv4()}
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

const StandingsTable = ({
  teamsStandings,
  groupBy,
}: IStandingsTableProps): JSX.Element => {
  const selectedGroup = groupBy === 'conference' ? groupConference : groupDivision;

  const filteredTeamsByGroup = filterTeamsByGroup(
    teamsStandings,
    selectedGroup,
    groupBy,
  ) as ITeamsStandingsRender[][];

  return <>{filteredTeamsByGroup.map(createStandingsTables)}</>;
};

export default StandingsTable;
