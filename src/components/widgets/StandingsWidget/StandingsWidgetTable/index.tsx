import React from 'react';
import { Radio, Table } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import classnames from 'classnames';

import styles from './StandingsWidgetTable.module.scss';
import { filterTeamsByGroup } from '../../../../utils/standings';
import { standingsWidgetTableColumns } from '../../../../content/standingsContent';
import { apiNba } from '../../../../services/apiNbaService';
import { IFetchTeamsStandings } from '../../../../types/apiNbaTypes';
import ErrorMsg from '../../../ErrorMsg';
import Spinner from '../../../Spinner';

interface IStandingsWidgetTableProps {
  currentSeason: string;
}

const StandingsWidgetTable = ({
  currentSeason,
}: IStandingsWidgetTableProps): JSX.Element => {
  const [conference, setConference] = React.useState('east');
  const { data, error, isLoading } = apiNba.useFetchTeamsStandingsQuery(currentSeason);

  const handleConferenceChange = (e: RadioChangeEvent) => {
    setConference(e.target.value);
  };

  if (error) {
    if ('message' in error) {
      return (
        <ErrorMsg
          failedData="Teams Standings"
          notAvaliableService="Api NBA"
          details={error.message as string}
        />
      );
    }

    if ('error' in error) {
      return (
        <ErrorMsg
          failedData="Teams Standings"
          notAvaliableService="Api NBA"
          details={error.error}
        />
      );
    }
  }

  if (isLoading) return <Spinner />;

  const teamsStandings = data as IFetchTeamsStandings[];
  const filteredTeamsByGroup = filterTeamsByGroup(
    teamsStandings,
    conference,
    'conference',
  ) as IFetchTeamsStandings[];

  const dataSource = filteredTeamsByGroup.map((team) => {
    const { lastTenWin } = team;
    const lastTenLoss = 10 - lastTenWin;

    return {
      key: team.teamId,
      team: (
        <div className={styles.team}>
          <span className={styles.teamRank}>{team.conference.rank}</span>
          <img
            className={styles.teamImage}
            src={team.logo}
            alt={team.fullName}
            width={20}
            height="auto"
          />
          <a href={`https://nba.com/${team.nickName}`} target="_blank" rel="noreferrer">
            {team.shortName}
          </a>
        </div>
      ),
      totalWin: team.totalWin,
      totalLoss: team.totalLoss,
      last10: (
        <div
          className={styles.lastTen}
          style={{
            backgroundColor: classnames({
              'rgb(100, 188, 97)': lastTenLoss <= 2,
              'rgb(164, 216, 110)': lastTenLoss === 3,
              'rgb(215, 238, 142)': lastTenLoss === 4,
              'rgb(249, 247, 174)': lastTenLoss === 5,
              'rgb(254, 221, 141)': lastTenLoss === 6,
              'rgb(252, 172, 99)': lastTenLoss === 7,
              'rgb(241, 110, 67)': lastTenLoss >= 8,
            }),
          }}
        >
          {lastTenWin}-{lastTenLoss}
        </div>
      ),
    };
  });

  return (
    <div className={styles.container}>
      <Radio.Group
        className={styles.buttons}
        defaultValue={conference}
        buttonStyle="solid"
        onChange={handleConferenceChange}
      >
        <Radio.Button value="east">EASTERN</Radio.Button>
        <Radio.Button value="west">WESTERN</Radio.Button>
      </Radio.Group>
      <Table
        className={styles.table}
        dataSource={dataSource}
        columns={standingsWidgetTableColumns}
        pagination={false}
      />
    </div>
  );
};

export default StandingsWidgetTable;
