import React from 'react';
import { Select } from 'antd';
import styles from './StatsPickers.module.scss';
import teamsByDivisionContent from '../../../content/teamsByDivisionContent';
import { seasonTypes } from '../../../content/statsContent';
import { getAvaliableStatsSeasons, getTeamPickerContent } from '../../../utils/stats';
import { formatSeasons } from '../../../utils/standings';
import { StatsPickersProps } from '../../../types/props';

const { Option } = Select;

const StatsPickers = ({
  handleTeamChange,
  handleSeasonChange,
  handleSeasonTypeChange,
}: StatsPickersProps): JSX.Element => {
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
      <label htmlFor="team" className={styles.heading}>
        TEAM
        <Select
          id="team"
          className={styles.selector}
          placeholder="Select Team"
          onChange={onTeamChange}
          aria-expanded={false}
        >
          {teamPicker}
        </Select>
      </label>
      <label htmlFor="season" className={styles.heading}>
        SEASON
        <Select
          id="season"
          className={styles.selector}
          defaultValue={formatedSeasons[0]}
          onChange={onSeasonChange}
          aria-expanded={false}
        >
          {seasonPicker}
        </Select>
      </label>
      <label htmlFor="type" className={styles.heading}>
        SEASON TYPE
        <Select
          id="type"
          className={styles.selector}
          defaultValue={seasonTypes[0].type}
          onChange={onSeasonTypeChange}
          aria-expanded={false}
        >
          {seasonTypePicker}
        </Select>
      </label>
    </div>
  );
};

export default React.memo(StatsPickers);
