import React from 'react';
import { Select } from 'antd';

import styles from './StatsPickers.module.scss';
import teamsByDivisionContent from '../../../content/teamsByDivisionContent';
import { seasonTypes } from '../../../content/statsContent';
import { getAvaliableStatsSeasons, getTeamPickerContent } from '../../../utils/stats';
import { formatSeasons } from '../../../utils/standings';

const { Option } = Select;

const StatsPickers = ({
  handleTeamChange,
  handleSeasonChange,
  handleSeasonTypeChange,
}: any): JSX.Element => {
  const teamPickerContent = getTeamPickerContent(teamsByDivisionContent);
  const formatedSeasons = formatSeasons(getAvaliableStatsSeasons());

  const teamPicker = teamPickerContent.map(({ teamName, shortName }) => (
    <Option key={shortName} value={teamName}>
      {teamName}
    </Option>
  ));
  const seasonPicker = formatedSeasons.map((season) => (
    <Option key={season} value={season}>
      {season}
    </Option>
  ));
  const seasonTypePicker = seasonTypes.map(({ type, query }) => (
    <Option key={query} value={type}>
      {type}
    </Option>
  ));

  const onTeamChange = (_: string, { key }: any) => {
    handleTeamChange(key as string);
  };
  const onSeasonChange = (value: string) => {
    handleSeasonChange(value);
  };
  const onSeasonTypeChange = (_: string, { key }: any) => {
    handleSeasonTypeChange(key as string);
  };

  return (
    <div className={styles.picker}>
      <div>
        <h5 className={styles.heading}>TEAM</h5>
        <Select
          className={styles.selector}
          placeholder="Select Team"
          onChange={onTeamChange}
        >
          {teamPicker}
        </Select>
      </div>
      <div>
        <h5 className={styles.heading}>SEASON</h5>
        <Select
          className={styles.selector}
          defaultValue={formatedSeasons[0]}
          onChange={onSeasonChange}
        >
          {seasonPicker}
        </Select>
      </div>
      <div>
        <h5 className={styles.heading}>SEASON TYPE</h5>
        <Select
          className={styles.selector}
          defaultValue={seasonTypes[0].type}
          onChange={onSeasonTypeChange}
        >
          {seasonTypePicker}
        </Select>
      </div>
    </div>
  );
};

export default React.memo(StatsPickers);
