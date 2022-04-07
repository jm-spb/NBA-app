import React from 'react';
import styles from './HomePage.module.scss';
import MainCarousel from '../../components/MainCarousel';
import LatestNews from '../../components/widgets/LatestNews';

const HomePage = (): JSX.Element => (
  <div>
    <MainCarousel />
    <section className={styles.section}>
      <LatestNews />
    </section>
  </div>
);

export default HomePage;
