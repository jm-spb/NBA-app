import instance from '../config';
import { ITeamsFullData } from '../../types/teams';

export const fetchTeams = async () => {
  const { data } = await instance.get<ITeamsFullData>('teams/league/standard');

  // 1) filter only regular NBA teams
  // 2) kepp only necessary fields in each team object
  const regularTeams = data.api.teams
    .filter(
      (team) =>
        team.fullName &&
        team.teamId &&
        team.logo &&
        (team.leagues && team.leagues.standard.divName)
    )
    .map(({ fullName, teamId, logo, leagues }) =>
      Object.assign({}, { fullName, teamId, logo, leagues })
    );
  return regularTeams;
};

// export const fetchTeams = async (): Promise<ITeamsRenderData[]> => {
//   const { data } = await instance.get<ITeamsFullData>('teams/league/standard');
//   return data.api.teams;
// };
