import React from 'react';

import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { format } from 'date-fns';

import Slide from './Slide';

import { nbaApi } from '../../services/NbaService';
import { IScoreboardGames } from '../../types/scoreboardGames';

SwiperCore.use([Navigation]);

const ScoreboardCarousel = (): JSX.Element => {
  // const todayDate = new Date();
  // const tomorrowDate = addDays(todayDate, 1);

  const getGames = (date: Date): IScoreboardGames[] => {
    const gamesDate: string = format(date, 'yyyy-MM-dd');
    const { data } = nbaApi.useFetchScoreboardGamesQuery(gamesDate);
    return data as IScoreboardGames[];
  };

  const handleHomeWin = (homeTeamScore: string, visitorTeamScore: string): boolean => {
    if (Number(homeTeamScore) > Number(visitorTeamScore)) return true;
    return false;
  };

  const createGameSlides = (games: IScoreboardGames[]): JSX.Element[] =>
    games?.map(({ gameId, startTimeUTC, hTeam, vTeam }) => {
      const gameDate = format(new Date(startTimeUTC), 'dd-MM-yyyy HH:mm');
      const homeWin = handleHomeWin(hTeam.score.points, vTeam.score.points);
      return (
        <SwiperSlide key={gameId}>
          <Slide
            startTimeUTC={gameDate}
            hTeam={hTeam}
            vTeam={vTeam}
            homeTeamWinningCaret={homeWin ? 'active' : ''}
            visitTeamWinningCaret={homeWin ? '' : 'active'}
          />
        </SwiperSlide>
      );
    });

  const todayGames = getGames(new Date('2021-12-05'));
  const tomorrowGames = getGames(new Date('2021-12-06'));
  const combineGames = todayGames?.concat(tomorrowGames);
  console.log(combineGames);

  const gameSlides = combineGames ? createGameSlides(combineGames) : '';

  // console.log(renderSlides);

  // const renderGamesLength = (todayGames?.length || 0) + (tomorrowGames?.length || 0) + 2;

  // const renderGames = new Array(renderGamesLength);
  // console.log(renderGames.length);
  // console.log(todayGameSlides);

  // const gameSlides = todayGames?.map(({ gameId, startTimeUTC, hTeam, vTeam }) => {
  //   const gameDate = format(new Date(startTimeUTC), 'dd-MM-yyyy HH:mm');
  //   const homeWin = handleHomeWin(hTeam.score.points, vTeam.score.points);
  //   return (
  //     <SwiperSlide key={gameId}>
  //       <Slide
  //         startTimeUTC={gameDate}
  //         hTeam={hTeam}
  //         vTeam={vTeam}
  //         homeTeamWinningCaret={homeWin ? 'active' : ''}
  //         visitTeamWinningCaret={homeWin ? '' : 'active'}
  //       />
  //     </SwiperSlide>
  //   );
  // });

  const dateSlide = (
    <SwiperSlide className="date-slide">
      <div className="date-slide-content">
        <p className="date-slide-weekday">TUE</p>
        <p className="date-slide-monthday">DEC 07</p>
      </div>
    </SwiperSlide>
  );

  return (
    <div className="carousel">
      <Swiper
        navigation={true}
        className="carousel-swiper"
        slidesPerView={8}
        // spaceBetween={1}
      >
        {dateSlide}

        {gameSlides}
      </Swiper>
    </div>
  );
};

export default ScoreboardCarousel;
