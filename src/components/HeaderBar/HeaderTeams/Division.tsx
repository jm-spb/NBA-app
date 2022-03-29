import React from 'react';
import { Menu } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import { IHeaderTeamsDropdown } from '../../../types/contentTypes';

const Division = ({ division, teams }: IHeaderTeamsDropdown): JSX.Element => {
  const renderDivisionTeams = teams.map(({ teamName, nickName, teamLogo }) => (
    <Menu.Item className="ant-dropdown-team" key={uuidv4()}>
      <img
        src={teamLogo}
        width={25}
        height={25}
        alt={`${teamName} Logo`}
        className="ant-dropdown-team-logo"
      />
      <a
        className="ant-dropdown-team-fullName"
        href={`https://nba.com/${nickName}`}
        target="_blank"
        rel="noreferrer"
      >
        {teamName}
      </a>
    </Menu.Item>
  ));
  return (
    <Menu.ItemGroup className="ant-dropdown-division" title={division}>
      {renderDivisionTeams}
    </Menu.ItemGroup>
  );
};

export default React.memo(Division);
