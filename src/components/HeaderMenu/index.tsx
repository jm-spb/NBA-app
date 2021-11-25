import React from 'react';

import './HeaderMenu.scss';

import { Menu } from 'antd';

import { fetchTeams } from '../../api/rest/teams';
import { ITeamsRenderData } from '../../types/teams';

import Teams from './Teams';

const HeaderMenu: React.FC = () => {
  const [ teams, setTeams ] = React.useState<ITeamsRenderData[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const regularNbaTeams = await fetchTeams();
        setTeams(regularNbaTeams);
      } catch (error) {
        console.warn(error);
      }
    })();
  }, []);

  console.log(teams);

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item>Games</Menu.Item>
      <Menu.Item>Stats</Menu.Item>
      <Menu.Item>Standings</Menu.Item>
      <Teams allTeams={teams} />
    </Menu>
  );
};

export default HeaderMenu;
