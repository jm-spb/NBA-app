import React from 'react';
import { Menu, Dropdown } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import headerTeamsDropdown from '../../../content/headerContent';
import Division from './Division';

const menuTeams = (
  <Menu className="ant-dropdown-menu-teams">
    {headerTeamsDropdown.map(({ division, teams }) => (
      <Division key={uuidv4()} division={division} teams={teams} />
    ))}
  </Menu>
);

const HeaderTeams = (): JSX.Element => (
  <Dropdown
    className="header-dropdown-link"
    overlay={menuTeams}
    // getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
    placement="bottomRight"
  >
    <span>Teams</span>
  </Dropdown>
);

export default HeaderTeams;
