import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

import HeaderTeams from './HeaderTeams';
import ErrorMsg from '../ErrorMsg';
import { nbaApi } from '../../services/NbaService';
import { ITeamsRenderData } from '../../types/teamsHeader';

import Logo from '../../assets/nba-logo.svg';

const HeaderBar = (): JSX.Element => {
  const { Header } = Layout;
  const { data, isError, isLoading, isSuccess } = nbaApi.useFetchTeamsQuery('');

  console.log(isError, isLoading, isSuccess);
  console.log(data);

  const fetchedTeams = data as ITeamsRenderData[];

  return (
    <>
      {isError ? <ErrorMsg /> : null}
      <Header>
        <div className="header-content">
          <div className="header-logo">
            <Link to="/">
              <img src={Logo} width={100} height={35} alt="NBA Logo" />
            </Link>
          </div>
          <ul className="header-menu">
            <li>
              <Link to="/stats" className="header-link">
                Stats
              </Link>
            </li>
            <li>
              <Link to="/standings" className="header-link">
                Standings
              </Link>
            </li>
            <li>
              <HeaderTeams teams={fetchedTeams} />
            </li>
          </ul>
        </div>
      </Header>
    </>
  );
};

export default HeaderBar;
