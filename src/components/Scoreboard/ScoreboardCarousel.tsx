import React from 'react';

import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import Slide from './Slide';

import { nbaApi } from '../../services/NbaService';
import { IScoreboardGames } from '../../types/scoreboardGames';

SwiperCore.use([Navigation]);

const ScoreboardCarousel = (): JSX.Element => {
  const { data } = nbaApi.useFetchScoreboardGamesQuery('');
  const games = data as IScoreboardGames[];
  console.log(games);

  const handleHomeWin = (homeTeamScore: string, visitorTeamScore: string): boolean => {
    if (Number(homeTeamScore) > Number(visitorTeamScore)) return true;
    return false;
  };

  const renderSlides = games?.map(({ gameId, startTimeUTC, hTeam, vTeam }) => {
    const homeWin = handleHomeWin(hTeam.score.points, vTeam.score.points);
    return (
      <SwiperSlide key={gameId}>
        <Slide
          startTimeUTC={startTimeUTC}
          hTeam={hTeam}
          vTeam={vTeam}
          homeTeamWinningCaret={homeWin ? 'active' : ''}
          visitTeamWinningCaret={homeWin ? '' : 'active'}
        />
      </SwiperSlide>
    );
  });

  return (
    <div className="carousel">
      <Swiper
        navigation={true}
        className="carousel-swiper"
        slidesPerView={8}
        // spaceBetween={1}
      >
        {renderSlides}
      </Swiper>
    </div>
  );
};

export default ScoreboardCarousel;
