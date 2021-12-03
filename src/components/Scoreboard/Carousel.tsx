import React from 'react';

import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import Slide from './Slide';

import { nbaApi } from '../../services/NbaService';
import { IScoreboardGamesRender } from '../../types/scoreboardGames';

SwiperCore.use([Navigation]);

const ScoreboardCarousel: React.FC = () => {
  const { data } = nbaApi.useFetchScoreboardGamesQuery('');
  const games: IScoreboardGamesRender[] = data!;
  console.log(games);

  return (
    <div className="carousel">
      <Swiper
        navigation={true}
        className="carousel-swiper"
        slidesPerView={8}
        // spaceBetween={1}
      >
        {games?.map((game, idx) => (
          <SwiperSlide key={idx + 10}>
            <Slide
              startTimeUTC={game.startTimeUTC}
              hTeam={game.hTeam}
              vTeam={game.vTeam}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ScoreboardCarousel;
