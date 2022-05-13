import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { v4 as uuidv4 } from 'uuid';

import styles from './ScoreboardSwiper.module.scss';
import { ScoreboardSwiperProps } from '../../../types/props';
import { IGameDate } from '../../../types/scoreboardTypes';
import { IFetchScoreboardGames } from '../../../types/apiNbaTypes';
import { createScoreboardSlides } from '../../../utils/scoreboard';
import ScoreboardSlide from '../ScoreboardSlide';

const gamesNotFoundSlide = () => (
  <SwiperSlide key={uuidv4()} className={styles.swiperSlide}>
    <div className={styles.noGames}>No Games Found</div>
  </SwiperSlide>
);

const createGameDateSlides = ({ weekDay, monthDay }: IGameDate) => (
  <SwiperSlide key={uuidv4()} className={styles.dateSlide}>
    <div className={styles.content}>
      <p className={styles.weekday}>{weekDay}</p>
      <p className={styles.monthday}>{monthDay}</p>
    </div>
  </SwiperSlide>
);

const createGameSlides = ({
  gameId,
  startTime,
  statusGame,
  teamsInfo,
}: IFetchScoreboardGames): JSX.Element => (
  <SwiperSlide key={gameId} className={styles.swiperSlide}>
    <ScoreboardSlide
      gameId={gameId}
      startTime={startTime}
      statusGame={statusGame}
      teamsInfo={teamsInfo}
    />
  </SwiperSlide>
);

// Return "Games Not Found" when there are no avaliable games
const handleRenderGameSlides = (gameData: IFetchScoreboardGames[]) =>
  gameData.length > 0
    ? gameData.map(createGameSlides)
    : [gameData.length].map(gamesNotFoundSlide);

const ScoreboardSwiper = ({
  gamesDates,
  gamesRenderData,
}: ScoreboardSwiperProps): JSX.Element => {
  const gameDateSlides = gamesDates.map(createGameDateSlides);
  const renderGameDaySlides = gamesRenderData.map(handleRenderGameSlides);

  // create united array with gamesDateSlides and renderGameDaySlides
  const scoreboardSlides = createScoreboardSlides(gameDateSlides, renderGameDaySlides);

  return (
    <Swiper
      navigation
      className={styles.swiper}
      slidesPerView={2}
      slidesPerGroup={1}
      breakpoints={{
        480: {
          slidesPerView: 3,
          slidesPerGroup: 2,
        },
        640: {
          slidesPerView: 4,
          slidesPerGroup: 3,
        },
        800: {
          slidesPerView: 5,
          slidesPerGroup: 4,
        },
        1024: {
          slidesPerView: 7,
          slidesPerGroup: 6,
        },
        1280: {
          slidesPerView: 8,
          slidesPerGroup: 7,
        },
      }}
    >
      {scoreboardSlides}
    </Swiper>
  );
};

export default ScoreboardSwiper;
