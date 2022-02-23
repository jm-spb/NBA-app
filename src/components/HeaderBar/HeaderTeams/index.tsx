import React from 'react';
import { Menu, Dropdown } from 'antd';

import './HeaderMenu.scss';

import Division from './Division';
import headerTeamsDropdown from '../../../utils/headerTeamsDropdown';

const HeaderTeams = (): JSX.Element => {
  const menuTeams = (
    <Menu className="menu-teams">
      {headerTeamsDropdown.map(({ division, teams }) => (
        <Division key={division} division={division} teams={teams} />
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menuTeams}
      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
      placement="bottomRight"
    >
      <span className="ant-dropdown-link">Teams</span>
    </Dropdown>
  );
};

export default HeaderTeams;
