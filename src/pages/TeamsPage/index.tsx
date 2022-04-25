import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './TeamsPage.module.scss';
import teamsByDivisionContent from '../../content/teamsByDivisionContent';
import { TeamBasicInfoType, ITeamsByDivisionContent } from '../../types/contentTypes';

const TeamsPage = (): JSX.Element => {
  const renderDivisionTeam = ({ teamLogo, teamName, nickName }: TeamBasicInfoType) => (
    <div key={uuidv4()} className={styles.team}>
      <figure className={styles.figure}>
        <div className={styles.imageWrapper}>
          <img className={styles.teamLogo} src={teamLogo} alt={teamName} />
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
    <div key={uuidv4()} className={styles.division}>
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
