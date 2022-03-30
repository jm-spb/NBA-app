import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

import styles from './HeaderBar.module.scss';
import Logo from '../../assets/nba-logo.svg';
import HeaderDropdown from './HeaderDropdown';

const HeaderBar = (): JSX.Element => {
  const { Header } = Layout;

  return (
    <Header className={styles.header}>
      <div className={styles.content}>
        <Link to="/">
          <img
            className={styles.logoImg}
            src={Logo}
            width={100}
            height={35}
            alt="NBA Logo"
          />
        </Link>
        <ul className={styles.headerMenu}>
          <li className={styles.link}>
            <Link to="/stats">Stats</Link>
          </li>
          <li className={styles.link}>
            <Link to="/standings">Standings</Link>
          </li>
          <li className={styles.dropdownLink}>
            <HeaderDropdown />
          </li>
        </ul>
      </div>
    </Header>
  );
};

export default HeaderBar;
