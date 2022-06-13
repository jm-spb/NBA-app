import React from 'react';
import styles from './HomePage.module.scss';
import MainCarousel from '../../components/MainCarousel';
import LatestNews from '../../components/widgets/LatestNewsWidget';
import StandingsWidget from '../../components/widgets/StandingsWidget';

const HomePage = (): JSX.Element => (
  <>
    <MainCarousel />
    <div className={styles.container}>
      <article className={styles.mainWidgets}>
        <LatestNews />
      </article>
      <aside className={styles.sideWidgets}>
        <StandingsWidget />
      </aside>
    </div>
  </>
);

export default HomePage;
