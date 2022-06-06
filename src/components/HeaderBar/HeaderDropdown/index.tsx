import React from 'react';
import { Menu, Dropdown } from 'antd';
import styles from './HeaderDropdown.module.scss';
import teamsByDivisionContent from '../../../content/teamsByDivisionContent';
import teamsLogos from '../../../assets/teamsLogos';

const menuTeams = (
  <Menu className={styles.menuTeams}>
    {teamsByDivisionContent.map(({ division, teams }) => (
      <Menu.ItemGroup key={division} className={styles.division} title={division}>
        {teams.map(({ teamName, nickName }) => (
          <Menu.Item key={teamName} className={styles.team}>
            <img
              className={styles.teamLogo}
              src={teamsLogos[nickName]}
              width={25}
              height={25}
              alt={`${teamName} Logo`}
              loading="lazy"
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

export default React.memo(HeaderDropdown);
