import React from 'react';

import './App.scss';

import { Layout } from 'antd';

import Logo from './assets/nba-logo.svg';
import HeaderMenu from './components/HeaderMenu';
import Scoreboard from './components/Scoreboard';
import MainCarousel from './components/MainCarousel';
// import { nbaApi } from './services/NbaService';

const App: React.FC = () => {
  const { Header, Content, Footer } = Layout;
  // const { isLoading, isError } = nbaApi.useFetchTeamsQuery('');
  // const isError = false;
  // const isLoading = false;

  return (
    <Layout className="layout">
      <Header>
        <div className="header-content">
          <div className="header-logo">
            <img src={Logo} width={100} height={35} alt="NBA Logo" />
          </div>
          <ul className="header-menu">
            <li>
              <a className="header-link" onClick={(e) => e.preventDefault()}>
                Stats
              </a>
            </li>
            <li>
              <a className="header-link" onClick={(e) => e.preventDefault()}>
                Standings
              </a>
            </li>
            <li>
              <HeaderMenu />
            </li>
          </ul>
        </div>
      </Header>
      <Scoreboard />
      <div className="adv-banner"></div>
      <Content>
        <MainCarousel />
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
