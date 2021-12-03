import React from 'react';

import './Scoreboard.scss';

import ScoreboardCarousel from './Carousel';

const Scoreboard: React.FC = () => {
  return (
    <div className="scoreboard">
      <div className="scoreboard-inner">
        <ScoreboardCarousel />
      </div>
    </div>
  );
};

export default Scoreboard;
