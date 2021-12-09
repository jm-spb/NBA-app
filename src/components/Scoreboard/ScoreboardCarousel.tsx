import React from 'react';

import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { format, addDays } from 'date-fns';

import Slide from './Slide';

import { nbaApi } from '../../services/NbaService';
import { IScoreboardGames } from '../../types/scoreboardGames';

SwiperCore.use([Navigation]);

// const today = format(new Date(), 'yyyy-MM-dd');
const currentDay = '2021-12-05';
const nextDay = format(addDays(new Date(currentDay), 1), 'yyyy-MM-dd');
const date = [currentDay, nextDay];

const ScoreboardCarousel = (): JSX.Element => {
  const [gamesDates, setGamesDates] = React.useState(date);

  if (gamesDates[0] === '1') setGamesDates([...gamesDates, (gamesDates[0] = '22')]);

  const currentWeekDay = format(new Date(gamesDates[0]), 'E');
  const nextWeekDay = format(new Date(gamesDates[1]), 'E');
  const currentMonthDay = format(new Date(gamesDates[0]), 'MMM dd');
  const nextMonthDay = format(new Date(gamesDates[1]), 'MMM dd');

  const { data, isLoading, isSuccess } = nbaApi.useFetchScoreboardGamesQuery(gamesDates);
  const fetchedGames = data as IScoreboardGames[];
  console.log(fetchedGames);

  let renderCurrentDayGames: JSX.Element[] | null = null;
  let renderNextDayGames: JSX.Element[] | null = null;

  if (isSuccess) {
    const handleHomeWin = (homeTeamScore: string, visitorTeamScore: string): boolean => {
      if (Number(homeTeamScore) > Number(visitorTeamScore)) return true;
      return false;
    };

    const filterGames = (
      allGamesArray: IScoreboardGames[],
      dayIndex: number
    ): IScoreboardGames[] =>
      allGamesArray.filter(
        (game) => format(new Date(game.startTimeUTC), 'yyyy-MM-dd') === date[dayIndex]
      );

    const renderGameDaySlides = (dayGames: IScoreboardGames[]): JSX.Element[] =>
      dayGames.map(({ gameId, startTimeUTC, hTeam, vTeam }) => {
        const gameDate = format(new Date(startTimeUTC), 'HH:mm');
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

    const currentDayGames = filterGames(fetchedGames, 0);
    const nextDayGames = filterGames(fetchedGames, 1);

    renderCurrentDayGames = renderGameDaySlides(currentDayGames);
    renderNextDayGames = renderGameDaySlides(nextDayGames);
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="carousel">
      <Swiper
        navigation={true}
        className="carousel-swiper"
        slidesPerView={8}
        // spaceBetween={1}
      >
        <SwiperSlide className="date-slide">
          <div className="date-slide-content">
            <p className="date-slide-weekday">{currentWeekDay}</p>
            <p className="date-slide-monthday">{currentMonthDay}</p>
          </div>
        </SwiperSlide>

        {renderCurrentDayGames}

        <SwiperSlide className="date-slide">
          <div className="date-slide-content">
            <p className="date-slide-weekday">{nextWeekDay}</p>
            <p className="date-slide-monthday">{nextMonthDay}</p>
          </div>
        </SwiperSlide>

        {renderNextDayGames}
      </Swiper>
    </div>
  );
};

export default ScoreboardCarousel;
