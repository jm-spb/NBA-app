import React from 'react';
import { Menu } from 'antd';

import { IDivisionProps } from '../../../types/headerTeamsTypes';

const Division = ({ divName, divTeams }: IDivisionProps): JSX.Element => (
  <Menu.ItemGroup className="division" title={divName}>
    {divTeams?.map(({ id, logo, teamName }) => (
      <Menu.Item className="team" key={id}>
        <img
          src={logo}
          width={25}
          height={25}
          alt={`${teamName} Logo`}
          className="team-logo"
        />
        <span className="team-fullName">{teamName}</span>
      </Menu.Item>
    ))}
  </Menu.ItemGroup>
);

export default React.memo(Division);
