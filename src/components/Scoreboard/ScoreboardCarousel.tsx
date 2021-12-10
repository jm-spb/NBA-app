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
const currentDay = '2021-12-10';
const nextDay = format(addDays(new Date(currentDay), 1), 'yyyy-MM-dd');

const ScoreboardCarousel = (): JSX.Element => {
  const [gamesDates, setGamesDates] = React.useState([currentDay, nextDay]);

  const { data, isLoading, isSuccess } = nbaApi.useFetchScoreboardGamesQuery(gamesDates);
  const fetchedGames = data as IScoreboardGames[];
  console.log(fetchedGames);

  // Upcoming - when we be able to pick the date
  if (gamesDates[0] === '1') setGamesDates([...gamesDates, (gamesDates[0] = '22')]);

  const createDateSlides = (gameDate: string) => {
    const [weekDay, monthDay] = format(new Date(gameDate), 'E-MMM dd').split('-');
    return (
      <SwiperSlide className="date-slide">
        <div className="date-slide-content">
          <p className="date-slide-weekday">{weekDay}</p>
          <p className="date-slide-monthday">{monthDay}</p>
        </div>
      </SwiperSlide>
    );
  };

  // Create slides with proper date. If there are no games - render date slides anyway
  const [currentDayDateSlide, nextDayDateSlide] = gamesDates.map(createDateSlides);

  let renderCurrentDayGames: JSX.Element[] | null = null;
  let renderNextDayGames: JSX.Element[] | null = null;

  // Create slides with games. Create only when all games fetched
  if (isSuccess) {
    // Handle render arrow of a winner
    const handleHomeWin = (homeTeamScore: string, visitorTeamScore: string): boolean => {
      if (Number(homeTeamScore) > Number(visitorTeamScore)) return true;
      return false;
    };

    const filterGames = (
      allGamesArray: IScoreboardGames[],
      dayIndex: number
    ): IScoreboardGames[] =>
      allGamesArray.filter(
        (game) =>
          format(new Date(game.startTimeUTC), 'yyyy-MM-dd') === gamesDates[dayIndex]
      );

    const createGameSlides = ({
      gameId,
      startTimeUTC,
      statusGame,
      hTeam,
      vTeam,
    }: IScoreboardGames): JSX.Element => {
      const gameDate = format(new Date(startTimeUTC), 'HH:mm');
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
            startTimeUTC={gameDate}
            statusGame={statusGame}
            hTeam={hTeam}
            vTeam={vTeam}
            homeWinCaret={homeWinCaret}
            visitWinCaret={visitWinCaret}
            hTeamRecord={'10 - 12'}
            vTeamRecord={'15 - 23'}
          />
        </SwiperSlide>
      );
    };

    const renderGameDaySlides = (dayGames: IScoreboardGames[]): JSX.Element[] =>
      dayGames.map(createGameSlides);

    // From all games create separate arrays with games by each day
    const currentDayGames = filterGames(fetchedGames, 0);
    const nextDayGames = filterGames(fetchedGames, 1);

    // Create game slides by each day from filtered games arrays
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
        slidesPerGroup={8}
      >
        {currentDayDateSlide}
        {renderCurrentDayGames}

        {nextDayDateSlide}
        {renderNextDayGames}
      </Swiper>
    </div>
  );
};

export default ScoreboardCarousel;
