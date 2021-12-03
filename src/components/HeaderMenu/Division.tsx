import React from 'react';

import { Menu } from 'antd';
import { ITeamsRenderData } from '../../types/teamsHeader';

// import { nbaApi } from '../../services/NbaService';

const Division: React.FC<{ divName: string; divTeams: ITeamsRenderData[] }> = ({
  divName,
  divTeams,
}) => {
  // const { data: teams } = nbaApi.useFetchTeamsQuery('');

  // const divTeams =
  //   allTeams &&
  //   allTeams.filter(
  //     (el: any) => el.divName && el.divName.toLowerCase() === divName.toLowerCase()
  //   );

  console.log(divTeams);

  return (
    <Menu.ItemGroup className="division" title={divName}>
      {divTeams?.map((team) => (
        <Menu.Item className="team" key={team.teamId}>
          <img
            src={team.logo}
            width={25}
            height={25}
            alt={`${team.fullName} Logo`}
            // loading="lazy"
            className="team-logo"
          />
          <span className="team-fullName">{team.fullName}</span>
        </Menu.Item>
      ))}
    </Menu.ItemGroup>
  );
};

export default React.memo(Division);
