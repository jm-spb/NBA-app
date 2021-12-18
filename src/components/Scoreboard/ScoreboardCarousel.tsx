import React from 'react';

import 'swiper/modules/navigation/navigation.scss';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { format } from 'date-fns';

import Spinner from '../Spinner';
import Slide from './Slide';
import DatePicker from '../DatePicker';

import { currentDay, nextDay, formatNextDay } from '../../scripts/date';
import { nbaApi } from '../../services/NbaService';
import { IScoreboardGames } from '../../types/scoreboardGames';

SwiperCore.use([Navigation]);

const ScoreboardCarousel = (): JSX.Element => {
  const [gamesDates, setGamesDates] = React.useState([currentDay, nextDay]);

  const { data, isSuccess, isLoading, isError, isFetching } =
    nbaApi.useFetchScoreboardGamesQuery(gamesDates);
  const fetchedGames = data as IScoreboardGames[];

  // Handle Date change in Date Picker
  const onChange = (date: Date | null, dateString: string) => {
    if (date) setGamesDates([dateString, formatNextDay(dateString)]);
  };

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

  // Create DateSlides with proper date. If there are no games - render DateSlides anyway
  const [currentDayDateSlide, nextDayDateSlide] = gamesDates.map(createDateSlides);

  let renderCurrentDayGames: JSX.Element[] | JSX.Element | null = null;
  let renderNextDayGames: JSX.Element[] | JSX.Element | null = null;

  // Render "Games Not Found" when failed to fetch data or when there are no avaliable games
  const gamesNotFoundSlide = () => (
    <SwiperSlide>
      <div className="slide-noGames">No Games Found</div>
    </SwiperSlide>
  );

  if (isError) {
    renderCurrentDayGames = gamesNotFoundSlide();
    renderNextDayGames = gamesNotFoundSlide();
  }

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

    // If games are avaliable - Create game slides by each day from filtered games arrays ELSE render No Games Found
    renderCurrentDayGames = currentDayGames.length
      ? renderGameDaySlides(currentDayGames)
      : gamesNotFoundSlide();

    renderNextDayGames = nextDayGames.length
      ? renderGameDaySlides(nextDayGames)
      : gamesNotFoundSlide();
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="scoreboard-inner">
      <div className="scoreboard-datePicker">
        <span>Game Date</span>
        <DatePicker onChange={onChange} />
      </div>
      {isFetching ? (
        <Spinner />
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
      )}
    </div>
  );
};

export default ScoreboardCarousel;
