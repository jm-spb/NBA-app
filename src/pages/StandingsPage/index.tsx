import React from 'react';
import { Table } from 'antd';
import './StandingsPage.scss';

import { apiNba } from '../../services/apiNbaService';
import { ITeamsStandingsRender } from '../../types/apiNbaTypes';
import { standingsTableColumns } from '../../utils/constants';

const StandingsPage = (): JSX.Element => {
  const { data } = apiNba.useFetchTeamsStandingsQuery('');
  const teamsStandings = data as ITeamsStandingsRender[];

  const filteredTeamsByConference = ['east', 'west'].map((confName) =>
    teamsStandings
      .filter((team) => confName === team.conference.name)
      .sort((a, b) => a.conference.rank - b.conference.rank),
  );

  const renderTeams = filteredTeamsByConference.map((confTeams, idx) => {
    const dataSource = confTeams.map(
      ({
        teamId,
        conference,
        logo,
        fullName,
        totalWin,
        totalLoss,
        winPercentage,
        gamesBehind,
        division,
        homeWin,
        homeLoss,
        awayWin,
        awayLoss,
        lastTenWin,
        streak,
        winStreak,
      }) => ({
        key: teamId,
        team: (
          <div className="team">
            <span className="team-rank">{conference.rank}</span>
            <img
              className="team-image"
              src={logo}
              alt={fullName}
              width={20}
              height="auto"
            />
            <span className="team-fullName">{fullName}</span>{' '}
          </div>
        ),
        totalWin,
        totalLoss,
        winPercentage,
        gamesBehind,
        conf: `${conference.confWin}-${conference.confLoss}`,
        div: `${division.divisionWin}-${division.divisionLoss}`,
        home: `${homeWin}-${homeLoss}`,
        road: `${awayWin}-${awayLoss}`,
        last10: `${lastTenWin}-${10 - lastTenWin}`,
        streak: `${winStreak ? 'W' : 'L'} ${streak}`,
      }),
    );

    return (
      <Table
        key={confTeams[idx].conference.name}
        className="standings-table"
        dataSource={dataSource}
        columns={standingsTableColumns}
        pagination={false}
        title={() =>
          confTeams[idx].conference.name === 'east'
            ? 'Eastern Conference'
            : 'Western Conference'
        }
      />
    );
  });

  return (
    <div className="standings">
      <div className="standings-content">
        <div className="standings-header">
          <h1 className="standings-header-heading">
            NBA 2021-22 Regular Season Standings
          </h1>
        </div>
        {renderTeams}
      </div>
    </div>
  );
};

export default StandingsPage;
