import React from 'react';

import { Menu } from 'antd';
import { ITeamsRenderData } from '../../../types/teamsHeader';

// import { nbaApi } from '../../services/NbaService';

interface IDivisionProps {
  divName: string;
  divTeams: ITeamsRenderData[];
}

const Division = ({ divName, divTeams }: IDivisionProps): JSX.Element => (
  <Menu.ItemGroup className="division" title={divName}>
    {divTeams?.map((team) => (
      <Menu.Item className="team" key={team.teamId}>
        <img
          src={team.logo}
          width={25}
          height={25}
          alt={`${team.fullName} Logo`}
          // loading="lazy"
          className="team-logo"
        />
        <span className="team-fullName">{team.fullName}</span>
      </Menu.Item>
    ))}
  </Menu.ItemGroup>
);

export default React.memo(Division);
