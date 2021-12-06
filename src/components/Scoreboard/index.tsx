import React from 'react';

import './Scoreboard.scss';

import ScoreboardCarousel from './ScoreboardCarousel';

const Scoreboard = (): JSX.Element => {
  return (
    <div className="scoreboard">
      <div className="scoreboard-inner">
        <ScoreboardCarousel />
      </div>
    </div>
  );
};

export default Scoreboard;
