import React from 'react';

import './App.scss';

import { Layout } from 'antd';

import Logo from './assets/nba-logo.svg';
import HeaderMenu from './components/HeaderMenu';

const App: React.FC = () => {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <img src={Logo} width={100} height={35} alt="NBA Logo" />
        </div>
        <HeaderMenu />
      </Header>
      <Content>
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer className="footer">NBA App ©2021 Created by JM-SPB</Footer>
    </Layout>
  );
};

export default App;
