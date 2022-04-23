import React from 'react';
import { Alert, Select } from 'antd';

import styles from './StatsPage.module.scss';
import { apiNbaStats } from '../../services/apiNbaStats';
import { INbaStatsTeamsRender } from '../../types/apiNbaStats';
import { formatSeasons } from '../../utils/standings';
import { getAvaliableStatsSeasons } from '../../utils/stats';
import StatsTable from './StatsTable';
import ErrorMsg from '../../components/ErrorMsg';
import Spinner from '../../components/Spinner';

const { Option } = Select;
const formatedSeasons = formatSeasons(getAvaliableStatsSeasons());
const currentSeason = formatedSeasons[0];

const StatsPage = (): JSX.Element => {
  const [teamId, setTeamId] = React.useState('');
  const [selectedSeason, setSelectedSeason] = React.useState(currentSeason);
  const { data, isError, isLoading } = apiNbaStats.useFetchNbaStatsTeamsQuery();

  if (isError) return <ErrorMsg failedData="teams" notAvaliableService="Api NBA Stats" />;
  if (isLoading) return <Spinner />;

  const allTeams = data as INbaStatsTeamsRender[];

  const teamPicker = allTeams.map(({ id, full_name }) => (
    <Option key={id} value={full_name}>
      {full_name}
    </Option>
  ));
  const seasonPicker = formatedSeasons.map((season) => (
    <Option key={season} value={season}>
      {season}
    </Option>
  ));

  const handleTeamChange = (_: string, { key }: any) => {
    setTeamId(key as string);
  };
  const handleSeasonChange = (value: string) => {
    setSelectedSeason(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Players Stats By Team</h1>
        <Alert
          className={styles.warningMsg}
          message="Due to lack of ApiNBA Stats data for current season, all statistics are available only for previous seasons"
          type="warning"
          showIcon
          closable
        />
        <div className={styles.picker}>
          <div>
            <h5 className={styles.heading}>TEAM</h5>
            <Select
              className={styles.selector}
              placeholder="Select Team"
              onChange={handleTeamChange}
            >
              {teamPicker}
            </Select>
          </div>
          <div>
            <h5 className={styles.heading}>SEASON</h5>
            <Select
              className={styles.selector}
              defaultValue={selectedSeason}
              onChange={handleSeasonChange}
            >
              {seasonPicker}
            </Select>
          </div>
        </div>
      </div>
      <div className={styles.tableContainer}>
        {teamId ? (
          <StatsTable teamId={teamId} selectedSeason={selectedSeason} />
        ) : (
          <Alert
            className={styles.infoMsg}
            message="Players Stats"
            description="Please select team and season to view players statistics"
            type="info"
            showIcon
          />
        )}
      </div>
    </div>
  );
};

export default StatsPage;
