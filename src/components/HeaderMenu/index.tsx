import React from 'react';

import './HeaderMenu.scss';

import { Menu, Dropdown } from 'antd';

// import { fetchTeams } from '../../api/rest/teams';
// import { ITeamsRenderData } from '../../types/teams';

// import Teams from './Teams';
import Division from './Division';
import { nbaApi } from '../../services/NbaService';

const divNames = [
  'ATLANTIC',
  'CENTRAL',
  'SOUTHEAST',
  'NORTHWEST',
  'PACIFIC',
  'SOUTHWEST',
];

const HeaderMenu: React.FC = () => {
  const { data: teams } = nbaApi.useFetchTeamsQuery('');

  console.log(teams);

  const getDivisionTeams = (division: string) =>
    teams?.filter((el) => el.divName.toLowerCase() === division.toLowerCase());

  // const { SubMenu } = Menu;

  // const { SubMenu } = Menu;
  // const [ teams, setTeams ] = React.useState<ITeamsRenderData[]>([]);

  // console.log(teams);

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
    <div className="header-menu">
      <Dropdown
        arrow
        overlay={menuTeams}
        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
        overlayStyle={{ position: 'absolute' }}
        placement="bottomRight"
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          TEAMS
        </a>
      </Dropdown>
    </div>
  );
};

export default HeaderMenu;
