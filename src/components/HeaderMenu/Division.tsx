import React from 'react';

import { Menu } from 'antd';

const Division = (props: { divName: string; allTeams: any[] }) => {
  console.log(props);

  const divTeams = props.allTeams.filter(
    (el) => el.leagues.standard.divName.toLowerCase() === props.divName.toLowerCase()
  );
  console.log(divTeams);

  return (
    <Menu.ItemGroup title={props.divName}>
      {/* <Menu.Item key="setting:1">Option 1</Menu.Item>
      <Menu.Item key="setting:2">Option 2</Menu.Item> */}
      {divTeams.map((team) => <Menu.Item key={team.teamId}>{team.fullName}</Menu.Item>)}
    </Menu.ItemGroup>
  );
};

export default React.memo(Division);
