import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { v4 as uuidv4 } from 'uuid';

import { GameDateType, IScoreboardGamesProps } from '../../types/scoreboardTypes';
import { createScoreboardSlides } from '../../utils/scoreboard';
import { IScoreboardGamesRender } from '../../types/apiNbaTypes';
import Slide from './Slide';

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
  startTime,
  statusGame,
  teamsInfo,
}: IScoreboardGamesRender): JSX.Element => (
  <SwiperSlide key={gameId} className="scoreboard-swiper-slide">
    <Slide
      gameId={gameId}
      startTime={startTime}
      statusGame={statusGame}
      teamsInfo={teamsInfo}
    />
  </SwiperSlide>
);

// Return "Games Not Found" when there are no avaliable games
const handleRenderGameSlides = (gameData: IScoreboardGamesRender[]) =>
  gameData.length > 0
    ? gameData.map(createGameSlides)
    : [gameData.length].map(gamesNotFoundSlide);

const ScoreboardGames = ({
  gamesDates,
  gamesRenderData,
}: IScoreboardGamesProps): JSX.Element => {
  const gameDateSlides = gamesDates.map(createGameDateSlides);
  const renderGameDaySlides = gamesRenderData.map(handleRenderGameSlides);

  // create united array with gamesDateSlides and renderGameDaySlides
  const scoreboardSlides = createScoreboardSlides(gameDateSlides, renderGameDaySlides);

  return (
    <Swiper navigation className="scoreboard-swiper" slidesPerView={8} slidesPerGroup={8}>
      {scoreboardSlides}
    </Swiper>
  );
};

export default ScoreboardGames;
