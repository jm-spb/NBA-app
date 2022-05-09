import { ITeamsInfo, IFetchTeamsStandings } from '../types/apiNbaTypes';
import {
  ICreateScoreboardSlides,
  ICreateTeamsRecords,
  ICreateWinCarets,
} from '../types/scoreboardTypes';

export const createWinCarets: ICreateWinCarets = (
  statusGame,
  homeTeamPoints,
  visitTeamPoints,
) => {
  let homeWinCaret = '';
  let visitWinCaret = '';

  if (statusGame === 'Finished') {
    homeWinCaret = homeTeamPoints > visitTeamPoints ? 'active' : '';
    visitWinCaret = homeTeamPoints > visitTeamPoints ? '' : 'active';
  }

  return [homeWinCaret, visitWinCaret];
};

export const createScoreboardSlides: ICreateScoreboardSlides = (
  gamesDatesSlides,
  gamesRenderSlides,
) => {
  const renderArray = [];

  for (let i = 0; i < gamesDatesSlides.length; i++) {
    renderArray.push(gamesDatesSlides[i]);
    const gameSlidesByDate = gamesRenderSlides[i];

    if (gameSlidesByDate instanceof Array) {
      renderArray.push(...gameSlidesByDate);
    } else {
      renderArray.push(gameSlidesByDate);
    }
  }
  return renderArray;
};

export const createTeamsRecords: ICreateTeamsRecords = (
  teamsStandingsArray,
  teamsInfoObject,
) => {
  // Type cast for proper iterate through object keys
  const keys = Object.keys(teamsInfoObject) as Array<keyof ITeamsInfo>;
  return keys.map(
    (key) =>
      teamsStandingsArray.find(
        ({ fullName }) => teamsInfoObject[key].fullName === fullName,
      ) as IFetchTeamsStandings,
  );
};
