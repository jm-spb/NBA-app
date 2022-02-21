import { ICreateScoreboardSlides, IHandleHomeWin } from '../types/scoreboardTypes';

export const handleHomeWin: IHandleHomeWin = (homeTeamScore, visitorTeamScore) =>
  Number(homeTeamScore) > Number(visitorTeamScore);

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
