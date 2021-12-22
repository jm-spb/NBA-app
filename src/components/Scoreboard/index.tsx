import React from 'react';

import './Scoreboard.scss';

import ScoreboardCarousel from './ScoreboardCarousel';

const Scoreboard = (): JSX.Element => (
  <div className="scoreboard">
    <ScoreboardCarousel />
  </div>
);

export default Scoreboard;
