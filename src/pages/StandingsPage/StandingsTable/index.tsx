import React from 'react';
import { Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './StandingsTable.module.scss';
import {
  groupConference,
  groupDivision,
  standingsTableColumns,
} from '../../../content/standingsContent';
import { filterTeamsByGroup } from '../../../utils/standings';
import { IStandingsTableProps } from '../../../types/standingsTypes';
import Spinner from '../../../components/Spinner';
import { ITeamsStandingsRender } from '../../../types/apiNbaTypes';

const StandingsTable = ({
  teamsStandings,
  isFetching,
  groupBy,
}: IStandingsTableProps): JSX.Element => {
  if (isFetching) {
    return <Spinner />;
  }

  const selectedGroup = groupBy === 'conference' ? groupConference : groupDivision;

  const filteredTeamsByGroup = filterTeamsByGroup(
    teamsStandings,
    selectedGroup,
    groupBy,
  ) as ITeamsStandingsRender[][];

  const renderTeams = filteredTeamsByGroup.map((groupTeams, idx) => {
    const dataSource = groupTeams.map((team) => ({
      key: team.teamId,
      team: (
        <div>
          <span className={styles.teamRank}>{team[groupBy].rank}</span>
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
            rel="noreferrer"
          >
            {team.fullName}
          </a>
          <a
            className={styles.teamShortName}
            href={`https://nba.com/${team.nickName}`}
            target="_blank"
            rel="noreferrer"
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
    }));

    return (
      <Table
        key={uuidv4()}
        className={styles.table}
        dataSource={dataSource}
        columns={standingsTableColumns}
        pagination={false}
        scroll={{ x: 920 }}
        title={() => {
          if (groupBy === 'conference')
            return selectedGroup[idx] === 'east'
              ? 'Eastern Conference'
              : 'Western Conference';

          const divisionName = `${selectedGroup[idx][0].toUpperCase()}${selectedGroup[
            idx
          ].slice(1)}`;

          return `${divisionName} Division`;
        }}
      />
    );
  });

  return <div>{renderTeams}</div>;
};

export default StandingsTable;
