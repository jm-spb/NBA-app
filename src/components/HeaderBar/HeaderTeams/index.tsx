import React from 'react';
import { Menu, Dropdown } from 'antd';

import './HeaderMenu.scss';

import Division from './Division';
import {
  IHeaderTeamsProps,
  ITeamsRenderData,
  IGetDivisionTeams,
} from '../../../types/teamsHeader';

const divNames = [
  'ATLANTIC',
  'CENTRAL',
  'SOUTHEAST',
  'NORTHWEST',
  'PACIFIC',
  'SOUTHWEST',
];

const getDivisionTeams: IGetDivisionTeams<ITeamsRenderData> = (division, teamsArray) =>
  teamsArray?.filter(({ divName }) => divName.toLowerCase() === division.toLowerCase());

const HeaderTeams = ({ teams }: IHeaderTeamsProps): JSX.Element => {
  const menuTeams = (
    <Menu className="menu-teams">
      {divNames.map((divisionName) => {
        const divisionTeams = getDivisionTeams(divisionName, teams);
        return (
          <Division key={divisionName} divName={divisionName} divTeams={divisionTeams} />
        );
      })}
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