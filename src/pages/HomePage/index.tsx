import React from 'react';
import styles from './HomePage.module.scss';
import MainCarousel from '../../components/MainCarousel';
import LatestNews from '../../components/widgets/LatestNewsWidget';
import StandingsWidget from '../../components/widgets/StandingsWidget';

const HomePage = (): JSX.Element => (
  <div>
    <MainCarousel />
    <div className={styles.container}>
      <section className={styles.section}>
        <LatestNews />
      </section>
      <div className={styles.widgets}>
        <StandingsWidget />
      </div>
    </div>
  </div>
);

export default HomePage;
