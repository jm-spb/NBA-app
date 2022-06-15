import React from 'react';
import styles from './TeamsPage.module.scss';
import teamsByDivisionContent from '../../content/teamsByDivisionContent';
import { ITeamShortInfo, ITeamsByDivisionContent } from '../../types/contentTypes';
import teamsLogos from '../../assets/teamsLogos';

const TeamsPage = (): JSX.Element => {
  const renderDivisionTeam = ({
    // teamLogo,
    teamName,
    nickName,
    shortName,
  }: ITeamShortInfo) => (
    <div key={shortName} className={styles.team}>
      <figure className={styles.figure}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.teamLogo}
            src={teamsLogos[nickName]}
            alt={teamName}
            width={45}
            height={45}
          />
        </div>
      </figure>
      <div className={styles.teamContent}>
        <h3 className={styles.teamName}>{teamName}</h3>
        <a
          className={styles.link}
          href={`https://nba.com/${nickName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Profile
        </a>
        <a
          className={styles.link}
          href={`https://nba.com/${nickName}/schedule`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Schedule
        </a>
        <a
          className={styles.link}
          href={`https://nba.com/${nickName}/tickets`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tickets
        </a>
      </div>
    </div>
  );

  const renderDivision = ({ division, teams }: ITeamsByDivisionContent) => (
    <div key={division} className={styles.division}>
      <h3 className={styles.divisionName}>{division.toUpperCase()}</h3>
      <div className={styles.divisionTeams}>{teams.map(renderDivisionTeam)}</div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.heading}>All Teams</h2>
      </div>
      <div className={styles.teams}>{teamsByDivisionContent.map(renderDivision)}</div>
    </div>
  );
};

export default TeamsPage;
