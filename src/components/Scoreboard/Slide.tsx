import React from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import { IScoreboardGamesRender } from '../../types/apiNbaTypes';

const Slide = ({
  gameId,
  startTime,
  statusGame,
  teamsInfo: { homeTeamInfo, visitorTeamInfo },
}: IScoreboardGamesRender): JSX.Element => (
  <div className="slide">
    <div className={`slide-gameInfo ${gameId}`}>
      <span className="slide-gameStatus">{`${startTime}`}</span>
      <span className="slide-broadcaster">LEAGUE PASS</span>
    </div>
    <div className="slide-teamInfo">
      <div className="slide-team">
        <img
          src={visitorTeamInfo.logo}
          alt={visitorTeamInfo.fullName}
          width={16}
          height="auto"
          loading="lazy"
          className="slide-logo"
        />
        <div className="slide-teamName">{visitorTeamInfo.shortName}</div>
        <CaretRightOutlined className={`slide-winner ${visitorTeamInfo.winCaret}`} />
        {statusGame === 'Finished' ? (
          <div className="slide-score">{visitorTeamInfo.points}</div>
        ) : (
          <div className="slide-record">{`${visitorTeamInfo.win} - ${visitorTeamInfo.loss}`}</div>
        )}
      </div>
      <div className="slide-team">
        <img
          src={homeTeamInfo.logo}
          alt={homeTeamInfo.fullName}
          width={16}
          height="auto"
          loading="lazy"
          className="slide-logo"
        />
        <div className="slide-teamName">{homeTeamInfo.shortName}</div>
        <CaretRightOutlined className={`slide-winner ${homeTeamInfo.winCaret}`} />
        {statusGame === 'Finished' ? (
          <div className="slide-score">{homeTeamInfo.points}</div>
        ) : (
          <div className="slide-record">{`${homeTeamInfo.win} - ${homeTeamInfo.loss}`}</div>
        )}
      </div>
    </div>
  </div>
);

export default Slide;
