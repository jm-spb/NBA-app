import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { HamburgerSqueeze } from 'react-animated-burgers';
import classNames from 'classnames';

import styles from './HeaderBar.module.scss';
import Logo from '../../assets/nba-logo.svg';
import HeaderDropdown from './HeaderDropdown';

const { Header } = Layout;
let bodyOverflow = document.body.style.overflow;

const HeaderBar = (): JSX.Element => {
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    bodyOverflow = isActive ? 'hidden' : '';
  }, [isActive]);

  const toggleButton = React.useCallback(
    () => setIsActive((prevState) => !prevState),
    [],
  );

  const handleOnClickLink = () => {
    if (isActive && bodyOverflow === 'hidden') {
      return setIsActive(false);
    }
    return null;
  };

  return (
    <Header className={styles.header}>
      <nav className={styles.content}>
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
            <Link to="/stats" onClick={handleOnClickLink}>
              Stats
            </Link>
          </li>
          <li className={styles.link}>
            <Link to="/standings" onClick={handleOnClickLink}>
              Standings
            </Link>
          </li>
          <li className={styles.dropdownTeams}>
            <Link className={styles.dropdownLink} to="/teams" onClick={handleOnClickLink}>
              <HeaderDropdown />
            </Link>
          </li>
        </ul>
        <HamburgerSqueeze
          className={styles.hamburger}
          buttonWidth={24}
          barColor="white"
          {...{ isActive, toggleButton }}
        />
      </nav>
    </Header>
  );
};

export default HeaderBar;
