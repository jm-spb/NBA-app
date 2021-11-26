import React from 'react';

import { Menu } from 'antd';

import { nbaApi } from '../../services/NbaService';

const Division: React.FC<{ divName: string }> = ({ divName }) => {
  const { data: teams } = nbaApi.useFetchTeamsQuery('');

  const divTeams =
    teams &&
    teams.filter(
      (el) => el.divName && el.divName.toLowerCase() === divName.toLowerCase()
    );
  console.log(divTeams);

  return (
    <Menu.ItemGroup title={divName}>
      {divTeams &&
        divTeams.map((team) => <Menu.Item key={team.teamId}>{team.fullName}</Menu.Item>)}
    </Menu.ItemGroup>
  );
};

export default Division;
