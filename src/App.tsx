import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';
import 'swiper/swiper.scss';

import { Layout } from 'antd';

import HeaderBar from './components/Header';
import Scoreboard from './components/Scoreboard';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import StandingsPage from './pages/StandingsPage';
import ErrorMsg from './components/ErrorMsg';

import { nbaApi } from './services/NbaService';

const App: React.FC = () => {
  const { Header, Content, Footer } = Layout;
  const { isError } = nbaApi.useFetchTeamsQuery('');
  // const isError = false;
  // const isLoading = false;

  return (
    <Layout className="layout">
      {isError ? <ErrorMsg /> : null}
      <Header>
        <HeaderBar />
      </Header>

      <Scoreboard />
      <div className="layout-adv"></div>

      <Content>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/standings" element={<StandingsPage />} />
        </Routes>
      </Content>

      <Footer className="footer">NBA App ©2021 Created by JM-SPB</Footer>
    </Layout>
  );

  // return isError ? (
  //   <h1>Ooops! Fail to fetch data!</h1>
  // ) : isLoading ? (
  //   <h1>Loading...</h1>
  // ) : (
  //   <Layout className="layout">
  //     <Header>
  //       <div className="logo">
  //         <img src={Logo} width={100} height={35} alt="NBA Logo" />
  //       </div>
  //       <HeaderMenu />
  //     </Header>
  //     <Content>
  //       <div className="site-layout-content">Content</div>
  //     </Content>
  //     <Footer className="footer">NBA App ©2021 Created by JM-SPB</Footer>
  //   </Layout>
  // );
};

export default App;
