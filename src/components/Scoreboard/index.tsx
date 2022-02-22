import React from 'react';
import SwiperCore, { Navigation } from 'swiper';

import './Scoreboard.scss';
import 'swiper/modules/navigation/navigation.scss';

import Spinner from '../Spinner';
import DatePicker from '../DatePicker';
import ScoreboardGames from './ScoreboardGames';

import {
  currentDay,
  nextDay,
  formatNextDay,
  formatDatesInGameDateSlide,
} from '../../utils/formatDates';
import { apiNba } from '../../services/apiNbaService';

SwiperCore.use([Navigation]);

const Scoreboard = (): JSX.Element => {
  const [gamesDates, setGamesDates] = React.useState([currentDay, nextDay]);

  const { data, isLoading, isFetching } = apiNba.useFetchScoreboardGamesQuery(gamesDates);

  if (isLoading)
    return (
      <div className="scoreboard">
        <Spinner />
      </div>
    );

  // Handle Date change in Date Picker
  const onChange = (date: Date | null, dateString: string) => {
    if (date) setGamesDates([dateString, formatNextDay(dateString)]);
  };

  const formatedGamesDates = formatDatesInGameDateSlide(gamesDates);

  return (
    <div className="scoreboard">
      <div className="scoreboard-inner">
        <div className="scoreboard-datePicker">
          <span>Game Date</span>
          <DatePicker onChange={onChange} />
        </div>
        {/* Show Spinner on date change */}
        {isFetching ? (
          <Spinner />
        ) : (
          <div className="carousel">
            <ScoreboardGames gamesDates={formatedGamesDates} gamesRenderData={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
