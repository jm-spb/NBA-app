import React from 'react';
import { Menu, Dropdown } from 'antd';

import headerTeamsDropdown from '../../../utils/headerTeamsDropdown';
import Division from './Division';

const HeaderTeams = (): JSX.Element => {
  const menuTeams = (
    <Menu className="ant-dropdown-menu-teams">
      {headerTeamsDropdown.map(({ division, teams }) => (
        <Division key={division} division={division} teams={teams} />
      ))}
    </Menu>
  );

  return (
    <Dropdown
      className="header-dropdown-link"
      overlay={menuTeams}
      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
      placement="bottomRight"
    >
      <span>Teams</span>
    </Dropdown>
  );
};

export default HeaderTeams;
