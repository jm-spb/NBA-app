import React from 'react';
import { Link } from 'react-router-dom';

import styles from './StandingsWidget.module.scss';
import { formatSeasons, getSeasons } from '../../../utils/standings';
import StandingsWidgetTable from './StandingsWidgetTable';

const seasons = getSeasons(5);

const StandingsWidget = (): JSX.Element => {
  const formattedCurrentSeason = formatSeasons(seasons)[0];

  return (
    <div className={styles.standings}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{`${formattedCurrentSeason} Standings`}</h2>
        <Link to="/standings" className={styles.link} title="Go to Standings">
          Go to Standings
        </Link>
      </div>
      <StandingsWidgetTable currentSeason={seasons[0].toString()} />
    </div>
  );
};

export default StandingsWidget;
