import React from 'react';

import './HeaderMenu.scss';

import { Menu, Dropdown } from 'antd';

import Division from './Division';

import { nbaApi } from '../../services/NbaService';
import { ITeamsRenderData } from '../../types/teamsHeader';

const divNames = [
  'ATLANTIC',
  'CENTRAL',
  'SOUTHEAST',
  'NORTHWEST',
  'PACIFIC',
  'SOUTHWEST',
];

const HeaderMenu = (): JSX.Element => {
  const { data } = nbaApi.useFetchTeamsQuery('');
  const teams = data as ITeamsRenderData[];

  console.log(teams);

  const getDivisionTeams = (division: string) =>
    teams?.filter((el) => el.divName.toLowerCase() === division.toLowerCase());

  const menuTeams = (
    <Menu className="menu-teams">
      {divNames.map((divisionName) => {
        const divisionTeams = getDivisionTeams(divisionName);
        return (
          <Division key={divisionName} divName={divisionName} divTeams={divisionTeams} />
        );
      })}
    </Menu>
  );

  return (
    // <div className="header-menu">
    <Dropdown
      overlay={menuTeams}
      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
      placement="bottomRight"
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        TEAMS
      </a>
    </Dropdown>
    // </div>
  );
};

export default HeaderMenu;
