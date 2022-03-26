import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'swiper/swiper.scss';

import './App.scss';
import HeaderBar from './components/HeaderBar';
import Scoreboard from './components/Scoreboard';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import StandingsPage from './pages/StandingsPage';
import FooterCustom from './components/FooterCustom';

const App = (): JSX.Element => {
  const { Content } = Layout;

  console.log('render');

  return (
    <Layout className="layout">
      <div className="layout-top">
        <HeaderBar />
        <Scoreboard />
      </div>
      <div className="layout-content">
        <div className="layout-adv" />
        <Content className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/standings" element={<StandingsPage />} />
          </Routes>
        </Content>
        <FooterCustom />
      </div>
    </Layout>
  );
};

export default App;
