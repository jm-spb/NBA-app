import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'swiper/swiper.scss';
import './styles/App.less';
import HeaderBar from './components/HeaderBar';
import Scoreboard from './components/Scoreboard';
import FooterCustom from './components/FooterCustom';
import Spinner from './components/Spinner';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const StatsPage = React.lazy(() => import('./pages/StatsPage'));
const StandingsPage = React.lazy(() => import('./pages/StandingsPage'));
const TeamsPage = React.lazy(() => import('./pages/TeamsPage'));
const GameDetailsPage = React.lazy(() => import('./pages/GameDetailsPage'));
const GameBoxScorePage = React.lazy(() => import('./pages/GameBoxScorePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const { Content } = Layout;

const App = (): JSX.Element => (
  <Layout className="layout">
    <div className="layout-top">
      <HeaderBar />
      <div className="scoreboard">
        <Scoreboard />
      </div>
    </div>
    <div className="layout-content">
      <div className="layout-adv" />
      <Content className="main">
        <React.Suspense fallback={<Spinner loadingData="Page" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/standings" element={<StandingsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/game_details_:gameId" element={<GameDetailsPage />} />
            <Route path="/game_box_score_:gameId" element={<GameBoxScorePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </React.Suspense>
      </Content>
    </div>
    <FooterCustom />
  </Layout>
);

export default App;
