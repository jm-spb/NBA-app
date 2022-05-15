import React from 'react';
import { Select } from 'antd';
import styles from './StandingsPicker.module.scss';
import { StandingsPickerProps } from '../../../types/props';

const { Option } = Select;

const StandingsPicker = ({
  seasons,
  onSeasonChange,
  onGroupChange,
}: StandingsPickerProps): JSX.Element => {
  const seasonPicker = seasons.map((season) => (
    <Option key={season} value={season}>
      {season}
    </Option>
  ));

  const groupByPicker = ['Conference', 'Division'].map((group) => (
    <Option key={group} value={group}>
      {group}
    </Option>
  ));

  const handleSeasonChange = (key: string) => {
    onSeasonChange(key.slice(0, 4));
  };

  const handleGroupChange = (key: string) => {
    const keyTyped = key.toLowerCase() as 'conference' | 'division';
    onGroupChange(keyTyped);
  };

  return (
    <div className={styles.picker}>
      <label htmlFor="season" className={styles.heading}>
        SEASON
        <Select
          id="season"
          className={styles.selector}
          defaultValue={seasons[0]}
          onChange={handleSeasonChange}
          aria-expanded={false}
        >
          {seasonPicker}
        </Select>
      </label>
      <label htmlFor="groupBy" className={styles.heading}>
        GROUP BY
        <Select
          id="groupBy"
          className={styles.selector}
          defaultValue="Conference"
          onChange={handleGroupChange}
          aria-expanded={false}
        >
          {groupByPicker}
        </Select>
      </label>
    </div>
  );
};

export default React.memo(StandingsPicker);
