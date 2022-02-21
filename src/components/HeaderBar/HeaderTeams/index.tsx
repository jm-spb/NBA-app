import React from 'react';
import { Menu, Dropdown } from 'antd';

import './HeaderMenu.scss';

import Division from './Division';
import { IHeaderTeamsProps, IGetDivisionTeams } from '../../../types/headerTeamsTypes';
import { ITeamsBaseInfoRenderData } from '../../../types/apiBasketballTypes';

const divNames = [
  'ATLANTIC',
  'CENTRAL',
  'SOUTHEAST',
  'NORTHWEST',
  'PACIFIC',
  'SOUTHWEST',
];

const getDivisionTeams: IGetDivisionTeams<ITeamsBaseInfoRenderData> = (
  division,
  teamsArray,
) =>
  teamsArray?.filter(
    ({ divisionName }) => divisionName.toLowerCase() === division.toLowerCase(),
  );

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
