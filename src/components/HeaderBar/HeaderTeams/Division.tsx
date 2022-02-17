import React from 'react';

import { Menu } from 'antd';
import { IDivisionProps } from '../../../types/teamsHeader';

const Division = ({ divName, divTeams }: IDivisionProps): JSX.Element => (
  <Menu.ItemGroup className="division" title={divName}>
    {divTeams?.map(({ teamId, logo, fullName }) => (
      <Menu.Item className="team" key={teamId}>
        <img
          src={logo}
          width={25}
          height={25}
          alt={`${fullName} Logo`}
          className="team-logo"
        />
        <span className="team-fullName">{fullName}</span>
      </Menu.Item>
    ))}
  </Menu.ItemGroup>
);

export default React.memo(Division);
