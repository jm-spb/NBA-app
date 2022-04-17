import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { HamburgerSqueeze } from 'react-animated-burgers';
import classNames from 'classnames';

import styles from './HeaderBar.module.scss';
import Logo from '../../assets/nba-logo.svg';
import HeaderDropdown from './HeaderDropdown';

const { Header } = Layout;

const HeaderBar = (): JSX.Element => {
  const [isActive, setIsActive] = React.useState(false);

  const toggleButton = React.useCallback(
    () => setIsActive((prevState) => !prevState),
    [],
  );

  React.useEffect(() => {
    document.body.style.overflow = isActive ? 'hidden' : '';
  }, [isActive]);

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
        <ul className={classNames(styles.headerMenu, { [styles.isActive]: isActive })}>
          <li className={styles.link}>
            <Link to="/stats" onClick={toggleButton}>
              Stats
            </Link>
          </li>
          <li className={styles.link}>
            <Link to="/standings" onClick={toggleButton}>
              Standings
            </Link>
          </li>
          <li className={styles.dropdownLink}>
            <HeaderDropdown />
          </li>
        </ul>
        <HamburgerSqueeze
          className={styles.hamburger}
          buttonWidth={24}
          barColor="white"
          {...{ isActive, toggleButton }}
        />
      </div>
    </Header>
  );
};

export default HeaderBar;
