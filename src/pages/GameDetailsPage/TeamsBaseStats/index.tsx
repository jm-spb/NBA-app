import React from 'react';
import { ITeamsBaseStatsProps } from '../../../types/gameDetails';
// import ErrorMsg from '../../../components/ErrorMsg';
// import Spinner from '../../../components/Spinner';
// import { apiNba } from '../../../services/apiNbaService';
// import { IGameDetailsTeamStatsRender } from '../../../types/apiNbaTypes';

import styles from './TeamsBaseStats.module.scss';

const TeamsBaseStats = ({ baseStats }: ITeamsBaseStatsProps): JSX.Element => {
  console.log(baseStats);

  return <div className={styles.team}>Hi</div>;
};

export default TeamsBaseStats;
