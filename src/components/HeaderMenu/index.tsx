import React from 'react';

import './HeaderMenu.scss';

import { Menu } from 'antd';

// import { fetchTeams } from '../../api/rest/teams';
// import { ITeamsRenderData } from '../../types/teams';

import Teams from './Teams';
import { nbaApi } from '../../services/NbaService';

const HeaderMenu: React.FC = () => {
  // const [ teams, setTeams ] = React.useState<ITeamsRenderData[]>([]);

  const { data: teams } = nbaApi.useFetchTeamsQuery('');
  console.log(teams);

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="Games">Games</Menu.Item>
      <Menu.Item key="Stats">Stats</Menu.Item>
      <Menu.Item key="Standings">Standings</Menu.Item>
      <Teams />
    </Menu>
  );
};

export default HeaderMenu;
