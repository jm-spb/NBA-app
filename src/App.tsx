import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'swiper/swiper.scss';

import './styles/App.scss';
import HeaderBar from './components/HeaderBar';
import Scoreboard from './components/Scoreboard';
import FooterCustom from './components/FooterCustom';
import Spinner from './components/Spinner';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const StatsPage = React.lazy(() => import('./pages/StatsPage'));
const StandingsPage = React.lazy(() => import('./pages/StandingsPage'));
const TeamsPage = React.lazy(() => import('./pages/TeamsPage'));

const { Content } = Layout;

const App = (): JSX.Element => {
  console.log('render');

  return (
    <Layout className="layout">
      <div className="layout-top">
        <HeaderBar />
        <section className="scoreboard">
          <Scoreboard />
        </section>
      </div>

      <div className="layout-content">
        <div className="layout-adv" />
        <Content className="main">
          <React.Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/standings" element={<StandingsPage />} />
              <Route path="/teams" element={<TeamsPage />} />
            </Routes>
          </React.Suspense>
        </Content>
      </div>
      <FooterCustom />
    </Layout>
  );
};

export default App;
