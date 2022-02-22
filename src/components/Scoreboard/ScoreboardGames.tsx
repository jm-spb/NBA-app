import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { v4 as uuidv4 } from 'uuid';

import Slide from './Slide';

import { GameDateType, IScoreboardGamesProps } from '../../types/scoreboardTypes';
import { IScoreboardGames } from '../../types/apiNbaTypes';
import { createScoreboardSlides, handleHomeWin } from '../../utils/scoreboard';
import { formatGameStartTime } from '../../utils/formatDates';

const gamesNotFoundSlide = () => (
  <SwiperSlide key={uuidv4()}>
    <div className="slide-noGames">No Games Found</div>
  </SwiperSlide>
);

const createGameDateSlides = ({ weekDay, monthDay }: GameDateType) => (
  <SwiperSlide key={uuidv4()} className="date-slide">
    <div className="date-slide-content">
      <p className="date-slide-weekday">{weekDay}</p>
      <p className="date-slide-monthday">{monthDay}</p>
    </div>
  </SwiperSlide>
);

const createGameSlides = ({
  gameId,
  startTimeUTC,
  statusGame,
  hTeam,
  vTeam,
}: IScoreboardGames): JSX.Element => {
  const gameStartTime = formatGameStartTime(startTimeUTC);
  let homeWinCaret = '';
  let visitWinCaret = '';

  if (statusGame === 'Finished') {
    const homeWin = handleHomeWin(hTeam.score.points, vTeam.score.points);
    homeWinCaret = homeWin ? 'active' : '';
    visitWinCaret = homeWin ? '' : 'active';
  }

  return (
    <SwiperSlide key={gameId}>
      <Slide
        startTimeUTC={gameStartTime}
        statusGame={statusGame}
        hTeam={hTeam}
        vTeam={vTeam}
        homeWinCaret={homeWinCaret}
        visitWinCaret={visitWinCaret}
        hTeamRecord="10 - 12"
        vTeamRecord="15 - 23"
      />
    </SwiperSlide>
  );
};

// Return "Games Not Found" when there are no avaliable games
const handleRenderGameSlides = (gameData: IScoreboardGames[]) =>
  gameData.length > 0
    ? gameData.map(createGameSlides)
    : [gameData.length].map(gamesNotFoundSlide);

const ScoreboardGames = ({
  gamesDates,
  gamesRenderData,
}: IScoreboardGamesProps): JSX.Element => {
  const gameDateSlides = gamesDates.map(createGameDateSlides);

  // Render "Games Not Found" when failed to fetch data or when there are no avaliable games
  const renderGameDaySlides = gamesRenderData
    ? gamesRenderData.map(handleRenderGameSlides)
    : gamesDates.map(gamesNotFoundSlide);

  // create united array with gamesDateSlides and renderGameDaySlides
  const scoreboardSlides = createScoreboardSlides(gameDateSlides, renderGameDaySlides);

  return (
    <Swiper navigation className="carousel-swiper" slidesPerView={8} slidesPerGroup={8}>
      {scoreboardSlides}
    </Swiper>
  );
};

export default ScoreboardGames;
