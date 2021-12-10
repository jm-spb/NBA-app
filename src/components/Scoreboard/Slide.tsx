import React from 'react';

import { IScoreboardGames } from '../../types/scoreboardGames';

import { CaretRightOutlined } from '@ant-design/icons';

const Slide = ({
  startTimeUTC,
  hTeam,
  vTeam,
  homeTeamWinningCaret,
  visitTeamWinningCaret,
}: IScoreboardGames): JSX.Element => {
  return (
    <div className="slide">
      <div className="slide-gameInfo">
        <span className="slide-gameStatus">{`${startTimeUTC}`}</span>
        <span className="slide-broadcaster">LEAGUE PASS</span>
      </div>
      <div className="slide-teamInfo">
        <div className="slide-team">
          {/* <div className="slide-logo"> */}
          <img
            src={vTeam.logo}
            alt={vTeam.fullName}
            width={16}
            height="auto"
            loading="lazy"
            className="slide-logo"
          />
          {/* </div> */}
          <div className="slide-teamName">{vTeam.shortName}</div>
          <CaretRightOutlined className={`slide-winner ${visitTeamWinningCaret}`} />
          <div className="slide-score">{vTeam.score.points}</div>
        </div>
        <div className="slide-team">
          {/* <div className="slide-logo"> */}
          <img
            src={hTeam.logo}
            alt={hTeam.fullName}
            width={16}
            height="auto"
            loading="lazy"
            className="slide-logo"
          />
          {/* </div> */}
          <div className="slide-teamName">{hTeam.shortName}</div>
          <CaretRightOutlined className={`slide-winner ${homeTeamWinningCaret}`} />
          <div className="slide-score">{hTeam.score.points}</div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
