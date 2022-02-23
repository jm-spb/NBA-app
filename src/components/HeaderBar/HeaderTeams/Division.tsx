import React from 'react';
import { Menu } from 'antd';

import { IHeaderTeamsDropdown } from '../../../types/headerTeamsTypes';

const Division = ({ division, teams }: IHeaderTeamsDropdown): JSX.Element => (
  <Menu.ItemGroup className="division" title={division}>
    {teams.map(({ teamName, nickName, teamLogo }) => (
      <Menu.Item className="team" key={teamName}>
        <img
          src={teamLogo}
          width={25}
          height={25}
          alt={`${teamName} Logo`}
          className="team-logo"
        />
        <a
          className="team-fullName"
          target="_blank"
          rel="noreferrer"
          href={`https://nba.com/${nickName}`}
        >
          {teamName}
        </a>
      </Menu.Item>
    ))}
  </Menu.ItemGroup>
);

export default React.memo(Division);
