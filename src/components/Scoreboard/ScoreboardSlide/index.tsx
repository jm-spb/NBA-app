import React from 'react';
import { Link } from 'react-router-dom';
import { CaretRightOutlined } from '@ant-design/icons';
import styles from './ScoreboardSlide.module.scss';
import { ScoreboardSlideProps } from '../../../types/props';
import teamsLogos from '../../../assets/teamsLogos';

const ScoreboardSlide = ({
  gameId,
  startTime,
  statusGame,
  teamsInfo: { homeTeamInfo, visitorTeamInfo },
}: ScoreboardSlideProps): JSX.Element => (
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
            // fullName,
            shortName,
            nickName,
            winCaret,
            points,
            totalWin,
            totalLoss,
          }) => (
            <div key={teamId} className={styles.team}>
              <img
                className={styles.logo}
                src={teamsLogos[nickName]}
                alt=""
                width={20}
                height={20}
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
