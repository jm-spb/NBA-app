import React from 'react';
import { Menu } from 'antd';

import { IHeaderTeamsDropdown } from '../../../types/headerTeamsTypes';

const Division = ({ division, teams }: IHeaderTeamsDropdown): JSX.Element => (
  <Menu.ItemGroup className="ant-dropdown-division" title={division}>
    {teams.map(({ teamName, nickName, teamLogo }) => (
      <Menu.Item className="ant-dropdown-team" key={teamName}>
        <img
          src={teamLogo}
          width={25}
          height={25}
          alt={`${teamName} Logo`}
          className="ant-dropdown-team-logo"
        />
        <a
          className="ant-dropdown-team-fullName"
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
