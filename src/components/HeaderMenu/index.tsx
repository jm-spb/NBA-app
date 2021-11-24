import React from 'react';

import './HeaderMenu.scss';

import { Menu } from 'antd';

import { fetchTeams } from '../../api/service';

import Teams from './Teams';

const HeaderMenu: React.FC = () => {
  const [ teams, setTeams ] = React.useState([]);

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

  // const renderTeamsbyDivision = (division) => {
  //   const teams =
  // }

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
