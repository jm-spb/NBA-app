import React from 'react';

import './Scoreboard.scss';

import ScoreboardCarousel from './ScoreboardCarousel';

const Scoreboard = (): JSX.Element => {
  return (
    <div className="scoreboard">
      <ScoreboardCarousel />
    </div>
  );
};

export default Scoreboard;
