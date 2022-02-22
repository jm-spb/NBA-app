import React from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import { IScoreboardGames } from '../../types/apiNbaTypes';

const Slide = ({
  startTimeUTC,
  statusGame,
  hTeam,
  vTeam,
  homeWinCaret,
  visitWinCaret,
  hTeamRecord,
  vTeamRecord,
}: IScoreboardGames): JSX.Element => (
  <div className="slide">
    <div className="slide-gameInfo">
      <span className="slide-gameStatus">{`${startTimeUTC}`}</span>
      <span className="slide-broadcaster">LEAGUE PASS</span>
    </div>

    <div className="slide-teamInfo">
      <div className="slide-team">
        <img
          src={vTeam.logo}
          alt={vTeam.fullName}
          width={16}
          height="auto"
          loading="lazy"
          className="slide-logo"
        />
        <div className="slide-teamName">{vTeam.shortName}</div>
        <CaretRightOutlined className={`slide-winner ${visitWinCaret}`} />

        {statusGame === 'Finished' ? (
          <div className="slide-score">{vTeam.score.points}</div>
        ) : (
          <div className="slide-record">{vTeamRecord}</div>
        )}
      </div>

      <div className="slide-team">
        <img
          src={hTeam.logo}
          alt={hTeam.fullName}
          width={16}
          height="auto"
          loading="lazy"
          className="slide-logo"
        />
        <div className="slide-teamName">{hTeam.shortName}</div>
        <CaretRightOutlined className={`slide-winner ${homeWinCaret}`} />

        {statusGame === 'Finished' ? (
          <div className="slide-score">{hTeam.score.points}</div>
        ) : (
          <div className="slide-record">{hTeamRecord}</div>
        )}
      </div>
    </div>
  </div>
);

export default Slide;
