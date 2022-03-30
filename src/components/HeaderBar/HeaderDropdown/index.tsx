import React from 'react';
import { Menu, Dropdown } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './HeaderDropdown.module.scss';
import headerTeamsDropdown from '../../../content/headerContent';

const menuTeams = (
  <Menu className={styles.menuTeams}>
    {headerTeamsDropdown.map(({ division, teams }) => (
      <Menu.ItemGroup key={uuidv4()} className={styles.division} title={division}>
        {teams.map(({ teamName, nickName, teamLogo }) => (
          <Menu.Item key={uuidv4()} className={styles.team}>
            <img
              className={styles.teamLogo}
              src={teamLogo}
              width={25}
              height={25}
              alt={`${teamName} Logo`}
            />
            <a
              className={styles.teamFullName}
              href={`https://nba.com/${nickName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {teamName}
            </a>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    ))}
  </Menu>
);

const HeaderDropdown = (): JSX.Element => (
  <Dropdown
    className={styles.dropdown}
    overlay={menuTeams}
    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
    placement="bottomRight"
  >
    <span>Teams</span>
  </Dropdown>
);

export default HeaderDropdown;
