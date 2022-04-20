import React from 'react';
import styles from './HomePage.module.scss';
import MainCarousel from '../../components/MainCarousel';
import LatestNews from '../../components/widgets/LatestNewsWidget';
import StandingsWidget from '../../components/widgets/StandingsWidget';

const HomePage = (): JSX.Element => (
  <div>
    <MainCarousel />
    <div className={styles.container}>
      <div className={styles.mainWidgets}>
        <LatestNews />
      </div>
      <div className={styles.sideWidgets}>
        <StandingsWidget />
      </div>
    </div>
  </div>
);

export default HomePage;
