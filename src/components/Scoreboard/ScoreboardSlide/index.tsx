import React from 'react';
import { Link } from 'react-router-dom';
import { CaretRightOutlined } from '@ant-design/icons';

import styles from './ScoreboardSlide.module.scss';
import { IFetchScoreboardGames } from '../../../types/apiNbaTypes';

const ScoreboardSlide = ({
  gameId,
  startTime,
  statusGame,
  teamsInfo: { homeTeamInfo, visitorTeamInfo },
}: IFetchScoreboardGames): JSX.Element => (
  <div className={styles.slide}>
    <div className={styles.game}>
      <div className={styles.gameInfo}>
        <span>{`${startTime}`}</span>
        <span className={styles.broadcaster}>LEAGUE PASS</span>
      </div>
      <div className={styles.teamInfo}>
        {[visitorTeamInfo, homeTeamInfo].map(
          ({
            teamId,
            logo,
            fullName,
            shortName,
            winCaret,
            points,
            totalWin,
            totalLoss,
          }) => (
            <div key={teamId} className={styles.team}>
              <img
                className={styles.logo}
                src={logo}
                alt={fullName}
                width={16}
                height="auto"
                loading="lazy"
              />
              <div className={styles.teamName}>{shortName}</div>
              <CaretRightOutlined
                className={`${styles.winner} ${
                  winCaret === 'active' ? styles.active : ''
                }`}
              />
              {statusGame === 'Finished' ? (
                <div className={styles.score}>{points}</div>
              ) : (
                <div className={styles.record}>{`${totalWin} - ${totalLoss}`}</div>
              )}
            </div>
          ),
        )}
      </div>
    </div>

    {statusGame === 'Finished' && (
      <div className={styles.gameStatsSlide}>
        <Link className={styles.gameStatsLink} to={`/game_details_${gameId}`}>
          Game Details
        </Link>
        <Link className={styles.gameStatsLink} to={`/game_box_score_${gameId}`}>
          Box Score
        </Link>
      </div>
    )}
  </div>
);

export default ScoreboardSlide;
