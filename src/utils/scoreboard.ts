import {
  ICreateScoreboardSlides,
  ICreateWinCarets,
  IHandleHomeWin,
} from '../types/scoreboardTypes';

const handleHomeWin: IHandleHomeWin = (homeTeamScore, visitorTeamScore) =>
  Number(homeTeamScore) > Number(visitorTeamScore);

export const createWinCarets: ICreateWinCarets = (
  statusGame,
  homeTeamPoints,
  visitTeamPoints,
) => {
  let homeWinCaret = '';
  let visitWinCaret = '';

  if (statusGame === 'Finished') {
    const homeWin = handleHomeWin(homeTeamPoints, visitTeamPoints);
    homeWinCaret = homeWin ? 'active' : '';
    visitWinCaret = homeWin ? '' : 'active';
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
